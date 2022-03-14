import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'

const EditContact = ({show, setShow, contact, editContact}) => {
    const [contactNumber, setContactNumber] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        if (!!contact) {
            setContactNumber(contact.contactNumber)
            setFirstName(contact.firstName)
            setLastName(contact.lastName)
            setEmail(contact.email)
        }
    }, [contact])
    

    const handleClose = () => {
        setShow(false)
    }

    const submit = (e) => {
        e.preventDefault()

        if (contactNumber === "") {
            console.log("null")
            return null
        }
        if (firstName === "") {
            console.log("null")
            return null
        }
        if (lastName === "") {
            console.log("null")
            return null
        }
        if (email === "") {
            console.log("null")
            return null
        }

        editContact({ id: contact.id, firstName, lastName, email, contactNumber})
        handleClose()
    }

    return (
        <Modal show={ show } onHide={ handleClose }>
            <form onSubmit={ submit }>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-group'>
                        <label>Contact #:</label>
                        <input 
                            type='text'
                            className='form-control'
                            value={ contactNumber }
                            onChange={(e) => setContactNumber(e.target.value)}
                        />
                    </div>
                    <div className='form-group mt-2'>
                        <label>First Name:</label>
                        <input 
                            type='text'
                            className='form-control'
                            value={ firstName }
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className='form-group mt-2'>
                        <label>Last Name:</label>
                        <input 
                            type='text'
                            className='form-control'
                            value={ lastName }
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className='form-group mt-2'>
                        <label>Email:</label>
                        <input 
                            type='email'
                            className='form-control'
                            value={ email }
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="submit"
                        className="btn btn-success btn-block"
                    >
                        Save
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default EditContact