import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'
import AddContact from './AddContact'
import EditContact from './EditContact'
import DeleteContact from './DeleteContact'

const ContactsTable = ({contacts, addContact, editContact, deleteContact, totalPages, pageNumber, getNextContacts, getPrevContacts, getLastContacts, getFirstContacts}) => {
    const [showAddContact, setShowAddContact] = useState(false)
    const [showEditContact, setShowEditContact] = useState(false)
    const [showDeleteContact, setShowDeleteContact] = useState(false)
    const [contact, setContact] = useState({})

    useEffect(() => {
        if (contacts) {
            setContact(contacts[0])
        }
    }, [contacts])

    const handleEdit = (contact) => {
        setContact(contact)
        setShowEditContact(true)
    }

    const handleDelete = (contact) => {
        setContact(contact)
        setShowDeleteContact(true)
    }

    return (
        <div className='row m-0 p-0' style={{backgroundColor: "white"}}>
            <div>
                <div className='mt-3'>
                    <h2>Contacts</h2>
                </div>
                <div className='card m-3'>
                    <div className='card-header'>
                        <button 
                            className='btn btn-success btn-block'
                            onClick={ () => setShowAddContact(true) }
                        >
                            Add Contact
                        </button>
                    </div>
                    
                        {
                            contacts.length > 0 ?
                                <>
                                    <div className='card-body'>
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th scope='col'>Contact #</th>
                                                    <th scope='col'>First Name</th>
                                                    <th scope='col'>Last Name</th>
                                                    <th scope='col'>Email</th>
                                                    <th scope='col'>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    contacts.map((contact, index) => (
                                                        <tr key={ index }>
                                                            <th scope='row'>{ contact.phoneNumber }</th>
                                                            <td>{ contact.firstName }</td>
                                                            <td>{ contact.lastName }</td>
                                                            <td>{ contact.email }</td>
                                                            <td>
                                                                <div className='row w-50'>
                                                                    <div className='col'>
                                                                        <FontAwesomeIcon 
                                                                            icon={ faPenSquare }
                                                                            style={ iconStyle }
                                                                            onClick={ () => handleEdit(contact) }
                                                                        />
                                                                    </div>
                                                                    <div className='col'>
                                                                        <FontAwesomeIcon 
                                                                            icon={ faTrash }
                                                                            style={ iconStyle }
                                                                            onClick={ () => handleDelete(contact) }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='card-footer'>
                                        <div className='mt-2' style={{float: "left"}}>
                                            <h6>Showing Page { pageNumber + 1 } of { totalPages }</h6>
                                        </div>
                                        <div style={{float: "right"}}>
                                            <nav>
                                                <ul className="pagination mb-0">
                                                    <li className={ pageNumber === 0 ? "page-item disabled" : "page-item"}><button className="page-link" onClick={() => getFirstContacts() }>{"<<"}</button></li>
                                                    <li className={ pageNumber === 0 ? "page-item disabled" : "page-item"}><button className="page-link" onClick={() => getPrevContacts() }>{"<"}</button></li>
                                                    <li className="page-item disabled"><button className="page-link" style={{color: "black"}}>{ pageNumber + 1 }</button></li>
                                                    <li className={pageNumber === totalPages - 1 ? "page-item disabled" : "page-item"}><button className="page-link" onClick={() => getNextContacts() }>{">"}</button></li>
                                                    <li className={pageNumber === totalPages - 1 ? "page-item disabled" : "page-item"}><button className="page-link" onClick={() => getLastContacts() }>{">>"}</button></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </>
                            :
                                <div className='card-body'>
                                    <div>
                                        <h5>No contacts</h5>
                                    </div>
                                </div>
                        }
                        
                </div>
            </div>
            <AddContact show={ showAddContact } setShow={ setShowAddContact } addContact={ addContact } />
            <EditContact show={ showEditContact } setShow={ setShowEditContact} contact={ contact } editContact={ editContact } />
            <DeleteContact show={ showDeleteContact } setShow={ setShowDeleteContact } contact={ contact } deleteContact={ deleteContact } />
        </div>
    )
}

const iconStyle = {
    width: "20px",
    height: "20px",
    cursor: "pointer"
}

export default ContactsTable