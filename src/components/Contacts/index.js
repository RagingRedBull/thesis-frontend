import React, { useEffect, useState } from 'react'
import SideNav from './SideNav'
import Header from './Header'
import '../../css/StatusReport.css' 
import axios from 'axios'
import ContactsTable from './ContactsTable'
import UserService from '../../services/UserService'

const StatusReport = ({fireDrillMode}) => {
    const [contacts, setContacts] = useState([])
    const [totalPages, setTotalPages] = useState(0)
    const [pageNumber, setPageNumber] = useState(0)

    useEffect(() => {
        getContacts()
    }, [])

    const getContacts = async () => {
        axios.get(
            global.config.server.url + "/contact/all",
            {
                params: {
                    pageSize: 10,
                    pageNumber: 0
                }
            }
        )
        .then(response => {
            setContacts(response.data.content)
            setTotalPages(response.data.totalPages)
            setPageNumber(0)
        })
        .catch(err => alert("Unable to connect to server."))
    }

    const addContact = (contact) => {
        axios.post(
            global.config.server.url + "/contact/new",
            contact,
            {
                headers: {
                    Authorization: `Bearer ${UserService.getToken()}`
                }
            }
        ).then(
            response => setContacts([...contacts, response.data])
        ).catch(err => alert("Unable to connect to server."))
    }

    const editContact = (editedContact) => {
        axios.put(
            global.config.server.url + "/contact/update/",
            editedContact,
            {
                headers: {
                    Authorization: `Bearer ${UserService.getToken()}`
                }
            }
        ).then(
            response => setContacts(contacts.map(contact => contact.id === response.data.id ? {...response.data} : contact))
        )
    }

    const deleteContact = (id) => {
        axios.delete(
            global.config.server.url + "/contact/delete/" + id,
            {
                headers: {
                    Authorization: `Bearer ${UserService.getToken()}`
                }
            }
        ).then(
            response => setContacts(contacts.filter(contact => contact.id !== id))
        )
        
    }

    const getNextContacts = () => {
        axios.get(
            global.config.server.url + "/contact/all",
            {
                params: { 
                    pageNumber: pageNumber + 1,
                    pageSize: 10
                }
            }
        ).then(
            response => {
                setContacts(response.data.content)
                setPageNumber(pageNumber + 1)
            }
        )
    }

    const getPrevContacts = () => {
        axios.get(
            global.config.server.url + "/contact/all",
            {
                params: { 
                    pageNumber: pageNumber - 1,
                    pageSize: 10
                }
            }
        ).then(
            response => {
                setContacts(response.data.content)
                setPageNumber(pageNumber - 1)
            }
        )
    }

    const getLastContacts = () => {
        axios.get(
            global.config.server.url + "/contact/all",
            {
                params: { 
                    pageNumber: totalPages - 1,
                    pageSize: 10
                }
            }
        ).then(
            response => {
                setContacts(response.data.content)
                setPageNumber(totalPages - 1)
            }
        )
    }

    const getFirstContacts = () => {
        axios.get(
            global.config.server.url + "/contact/all",
            {
                params: { 
                    pageNumber: 0,
                    pageSize: 10
                }
            }
        ).then(
            response => {
                setContacts(response.data.content)
                setPageNumber(0)
            }
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
                    totalPages={ totalPages }
                    pageNumber={ pageNumber }
                    getNextContacts={ getNextContacts }
                    getPrevContacts={ getPrevContacts }
                    getLastContacts={ getLastContacts }
                    getFirstContacts={ getFirstContacts }
                />
            </div>
        </div>
    )
}

export default StatusReport