import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

const AddContact = ({ show, setShow, addContact }) => {
    const [contactNumber, setContactNumber] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

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

        addContact({firstName, lastName, email, contactNumber})
        handleClose()
    }

    const handleClose = () => {
        setContactNumber("")
        setFirstName("")
        setLastName("")
        setEmail("")
        setShow(false)
    }

    return (
        <Modal show={ show } onHide={ handleClose }>
            <form onSubmit={ submit }>
                <Modal.Header closeButton>
                    <Modal.Title>Add Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-group'>
                        <label>Contact #:</label>
                        <input 
                            type='text'
                            className='form-control'
                            placeholder='Contact Number'
                            onChange={(e) => setContactNumber(e.target.value.trim())}
                        />
                    </div>
                    <div className='form-group mt-2'>
                        <label>First Name:</label>
                        <input 
                            type='text'
                            className='form-control'
                            placeholder='First Name'
                            onChange={(e) => setFirstName(e.target.value.trim())}
                        />
                    </div>
                    <div className='form-group mt-2'>
                        <label>Last Name:</label>
                        <input 
                            type='text'
                            className='form-control'
                            placeholder='Last Name'
                            onChange={(e) => setLastName(e.target.value.trim())}
                        />
                    </div>
                    <div className='form-group mt-2'>
                        <label>Email:</label>
                        <input 
                            type='email'
                            className='form-control'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value.trim())}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="submit"
                        className="btn btn-success btn-block"
                    >
                        Add Contact
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default AddContact