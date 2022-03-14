import React, { useEffect, useState } from 'react'
import SideNav from './SideNav'
import Header from './Header'
import '../../css/StatusReport.css' 
import axios from 'axios'
import ContactsTable from './ContactsTable'

const StatusReport = ({fireDrillMode}) => {
    const sampleContacts = [
        {
            firstName: "Marvin",
            lastName: "Sy",
            email: "janmartinvincent@gmail.com",
            contactNumber: "09399072280"
        },
        {
            firstName: "Lexus",
            lastName: "Reach",
            email: "janmartinvincent@gmail.com",
            contactNumber: "09399072280"
        },
    ]
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        setContacts(sampleContacts)
    }, [])

    const addContact = (contact) => {
        setContacts([...contacts, contact])
    }

    return (
        <div className='container-fluid status-report-container row m-0 p-0'>
            <div className='side-navigation-reports col-1 p-0'>
                <SideNav />
            </div>
            <div className='h-100 col-11 p-0 m-0 row g-0'>
                <Header fireDrillMode={ fireDrillMode } />
                <ContactsTable 
                    contacts={ contacts } 
                    addContact={ addContact }
                />
            </div>
        </div>
    )
}

export default StatusReport