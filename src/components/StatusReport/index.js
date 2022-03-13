import React, { useEffect, useState } from 'react'
import SideNav from './SideNav'
import Header from './Header'
import '../../css/StatusReport.css' 
import ReportDates from './ReportLogsTable'
import axios from 'axios'

const StatusReport = ({fireDrillMode}) => {
    const [logDate, setLogDate] = useState()
    const [reportLogs, setReportLogs] = useState([])
    const [pageSize, setPageSize] = useState()
    const [totalPages, setTotalPages] = useState()
    const [pageNumber, setPageNumber] = useState(0)

    useEffect(() => {
        getPageSize()
    }, [])

    const getReportLogs = async (date) => {
        axios.get(
            global.config.server.url + "/log/status-report",
            {
                params: { 
                    day: date,
                    pageNumber: 0,
                    pageSize: pageSize
                }
            }
        ).then(response => {
            setReportLogs(response.data.content)
            setPageNumber(0)
            setTotalPages(response.data.totalPages)
            setLogDate(date)
        })
    }

    const getNextReportLogs = async () => {
        axios.get(
            global.config.server.url + "/log/status-report",
            {
                params: { 
                    day: logDate,
                    pageNumber: pageNumber + 1,
                    pageSize: pageSize
                }
            }
        ).then(response => {
            setReportLogs(response.data.content)
            setPageNumber(pageNumber + 1)
        })
    }

    const getPrevReportLogs = async () => {
        axios.get(
            global.config.server.url + "/log/status-report",
            {
                params: { 
                    day: logDate,
                    pageNumber: pageNumber - 1,
                    pageSize: pageSize
                }
            }
        ).then(response => {
            setReportLogs(response.data.content)
            setPageNumber(pageNumber - 1)
        })
    }

    const getLastReportLogs = async () => {
        axios.get(
            global.config.server.url + "/log/status-report",
            {
                params: { 
                    day: logDate,
                    pageNumber: totalPages - 1,
                    pageSize: pageSize
                }
            }
        ).then(response => {
            setReportLogs(response.data.content)
            setPageNumber(totalPages - 1)
        })
    }

    const getFirstReportLogs = async () => {
        axios.get(
            global.config.server.url + "/log/status-report",
            {
                params: { 
                    day: logDate,
                    pageNumber: 0,
                    pageSize: pageSize
                }
            }
        ).then(response => {
            setReportLogs(response.data.content)
            setPageNumber(0)
        })
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
                <Header fireDrillMode={ fireDrillMode } />
                <ReportDates 
                    reportLogs={ reportLogs } 
                    getReportLogs={ getReportLogs }
                    totalPages={ totalPages }
                    pageNumber={ pageNumber }
                    getNextReportLogs={ getNextReportLogs }
                    getPrevReportLogs={ getPrevReportLogs }
                    getLastReportLogs={ getLastReportLogs }
                    getFirstReportLogs={ getFirstReportLogs }
                />
            </div>
        </div>
    )
}

export default StatusReport