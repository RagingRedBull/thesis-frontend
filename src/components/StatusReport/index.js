import React, { useState } from 'react'
import SideNav from './SideNav'
import Header from './Header'
import '../../css/StatusReport.css'
import ReportTable from './ReportTable'
import ReportDates from './ReportLogsTable'

const StatusReport = () => {
    const [reportLogs, setReportLogs] = useState()

    const getReportLogs = (date) => {
        setReportLogs(date)
        console.log(reportLogs)
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