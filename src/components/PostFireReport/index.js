import React, { useState, useEffect } from 'react'
import SideNav from './SideNav'
import Header from './Header'
import '../../css/StatusReport.css'
import axios from 'axios'
import DatesTable from './DatesTable'
import PostFireReportLogsTable from './PostFireReportLogsTable'

const StatusReport = ({fireDrillMode}) => {
    const [dates, setDates] = useState([])
    const [selectedDateId, setSelectedDateId] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)
    const [postFireLogs, setPostFireLogs] = useState(null)

    useEffect(() => {
        getDates()  
    }, [])
    
    const getDates = async () => {
        axios.get("http://172.104.70.74:8080/prmts/log/post-fire-report")
            .then(response => {
                setDates(response.data)
                console.log(response.data)
            })
    }

    const getLogs = async (date) => {
        axios.get(
            "http://172.104.70.74:8080/prmts/log/post-fire-report",
            {
                params: {
                    pfrId: date.id
                }
            }
        )
            .then(response => {
                setSelectedDateId(date.id)
                setSelectedDate(date.dateOccurred)
                setPostFireLogs(response.data)
            })
    }

    const reset = () => {
        setSelectedDateId(null)
        setSelectedDate(null)
        setPostFireLogs(null)
    }

    return (
        <div className='container-fluid status-report-container row m-0 p-0'>
            <div className='side-navigation-reports col-1 p-0'>
                <SideNav />
            </div>
            <div className='h-100 col-11 p-0 m-0 row g-0'>
                <Header fireDrillMode={ fireDrillMode } />
                {
                    selectedDateId ?
                        <PostFireReportLogsTable postFireLogs={ postFireLogs } reset={ reset } selectedDate={ selectedDate } />
                    :
                        <DatesTable dates={ dates } getLogs={ getLogs } />
                }
                
            </div>
        </div>
    )
}

export default StatusReport