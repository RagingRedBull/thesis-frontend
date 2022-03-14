import React, { useEffect, useState } from 'react'
import SideNav from './SideNav'
import Header from './Header'
import '../../css/StatusReport.css' 
import axios from 'axios'

const StatusReport = ({fireDrillMode}) => {
    

    useEffect(() => {
    }, [])

    

    return (
        <div className='container-fluid status-report-container row m-0 p-0'>
            <div className='side-navigation-reports col-1 p-0'>
                <SideNav />
            </div>
            <div className='h-100 col-11 p-0 m-0 row g-0'>
                <Header fireDrillMode={ fireDrillMode } />
            </div>
        </div>
    )
}

export default StatusReport