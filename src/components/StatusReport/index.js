import React, { useEffect, useState } from 'react'
import SideNav from './SideNav'
import Header from './Header'
import '../../css/StatusReport.css' 
import ReportDates from './ReportLogsTable'
import axios from 'axios'

const StatusReport = () => {
    const [reportLogs, setReportLogs] = useState([])
    const [pageSize, setPageSize] = useState()
    const [totalPages, setTotalPages] = useState()
    const [pageNumber, setPageNumber] = useState(0)
    useEffect(() => {
        getPageSize()
    }, [])

    const getReportLogs = async (date) => {
        axios.get(
            "http://172.104.70.74:8080/prmts/log/status-report",
            {
                params: { day: date }
            }
        ).then(response => {
            setReportLogs(response.data)
        })
    }

    const getNextReportLogs = () => {
    }

    const getPageSize = async () => {
        axios.get(global.config.server.url + "/detector/all", { params: { pageNumber: 0, pageSize: 10}})
            .then(response => { setPageSize(response.data.content.length) })
            .catch(() => { alert("There are no detectors registered!") })
    }

    return (
        <div className='container-fluid status-report-container row m-0 p-0'>
            <div className='side-navigation-reports col-1 p-0'>
                <SideNav />
            </div>
            <div className='h-100 col-11 p-0 m-0 row g-0'>
                <Header />
                <ReportDates 
                    reportLogs={ reportLogs } 
                    getReportLogs={ getReportLogs }
                />
                {/* <ReportTable /> */}
            </div>
        </div>
    )
}

export default StatusReport