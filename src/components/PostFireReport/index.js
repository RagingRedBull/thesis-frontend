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
    const [totalPages, setTotalPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(0)

    useEffect(() => {
        getDates()  
    }, [])
    
    const getDates = async () => {
        axios.get("http://172.104.70.74:8080/prmts/log/post-fire-report")
            .then(response => {
                setDates(response.data)
            })
    }

    const getLogs = async (date) => {
        axios.get(
            "http://172.104.70.74:8080/prmts/log/post-fire-report",
            {
                params: {
                    pfrId: date.id,
                    pageNumber: 0,
                    pageSize: 10
                }
            }
        )
            .then(response => {
                console.log(response)
                setSelectedDateId(date.id)
                setSelectedDate(date.dateOccurred)
                setTotalPages(response.data.totalPages)
                setPageNumber(0)
                setPostFireLogs(response.data.content)
            })
    }

    const getNextPostFireLogs = async () => {
        axios.get(
            "http://172.104.70.74:8080/prmts/log/post-fire-report",
            {
                params: { 
                    pfrId: selectedDateId,
                    pageNumber: pageNumber + 1,
                    pageSize: 10
                }
            }
        ).then(response => {
            setPostFireLogs(response.data.content)
            setPageNumber(pageNumber + 1)
        })
    }

    const getPrevPostFireLogs = async () => {
        axios.get(
            "http://172.104.70.74:8080/prmts/log/post-fire-report",
            {
                params: { 
                    pfrId: selectedDateId,
                    pageNumber: pageNumber - 1,
                    pageSize: 10
                }
            }
        ).then(response => {
            setPostFireLogs(response.data.content)
            setPageNumber(pageNumber - 1)
        })
    }

    const getLastPostFireLogs = async () => {
        axios.get(
            "http://172.104.70.74:8080/prmts/log/post-fire-report",
            {
                params: { 
                    pfrId: selectedDateId,
                    pageNumber: totalPages - 1,
                    pageSize: 10
                }
            }
        ).then(response => {
            setPostFireLogs(response.data.content)
            setPageNumber(totalPages - 1)
        })
    }

    const getFirstPostFireLogs = async () => {
        axios.get(
            "http://172.104.70.74:8080/prmts/log/post-fire-report",
            {
                params: { 
                    pfrId: selectedDateId,
                    pageNumber: 0,
                    pageSize: 10
                }
            }
        ).then(response => {
            setPostFireLogs(response.data.content)
            setPageNumber(0)
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
                        <PostFireReportLogsTable 
                            postFireLogs={ postFireLogs } 
                            reset={ reset } 
                            selectedDate={ selectedDate }
                            totalPages={ totalPages }
                            pageNumber={ pageNumber }
                            getNextPostFireLogs={ getNextPostFireLogs }
                            getPrevPostFireLogs={ getPrevPostFireLogs }
                            getLastPostFireLogs={ getLastPostFireLogs }
                            getFirstPostFireLogs={ getFirstPostFireLogs }
                        />
                    :
                        <DatesTable dates={ dates } getLogs={ getLogs } />
                }
                
            </div>
        </div>
    )
}

export default StatusReport