import React, { useEffect, useState } from 'react'
import SideNav from './SideNav'
import Header from './Header'
import '../../css/StatusReport.css' 
import axios from 'axios'
import ContactsTable from './ContactsTable'

const StatusReport = ({fireDrillMode}) => {
    const sampleContacts = [
        {
            id: 1,
            firstName: "Marvin",
            lastName: "Sy",
            email: "janmartinvincent@gmail.com",
            contactNumber: "09399072280"
        },
        {
            id: 2,
            firstName: "Lexus",
            lastName: "Reach",
            email: "janmartinvincent@gmail.com",
            contactNumber: "09399072281"
        },
    ]
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        setContacts(sampleContacts)
    }, [])

    const addContact = (contact) => {
        setContacts([...contacts, contact])
    }

    const editContact = (editedContact) => {
        setContacts(
            contacts.map(contact => contact.id === editedContact.id ?
                {...editedContact}
                :
                contact
            )
        )
    }

    const deleteContact = (id) => {
        setContacts(
            contacts.filter(contact => contact.id !== id)
        )
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
                    editContact={ editContact }
                    deleteContact={ deleteContact }
                />
            </div>
        </div>
    )
}

export default StatusReport