import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

const AddContact = ({ show, setShow, addContact }) => {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState([])

    const submit = (e) => {
        e.preventDefault()

        const errors = validate()
        if (errors.length > 0) {
            setErrors(errors)
            return null
        }

        addContact({firstName, lastName, email, phoneNumber: "+63" + phoneNumber})
        handleClose()
    }

    const handleClose = () => {
        setPhoneNumber("")
        setFirstName("")
        setLastName("")
        setEmail("")
        setErrors([])
        setShow(false)
    }

    const validate = () => {
        const errors = []
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (phoneNumber === "") {
            errors.push({phoneNumber: "Please enter the contact number."})
        } else if (isNaN(phoneNumber)) {
            errors.push({phoneNumber: "Invalid phone number format!"})
        } else if (phoneNumber.length !== 10) {
            errors.push({phoneNumber: "Phone number must only contain 10 digits!"})
        }
        if (firstName === "") {
            errors.push({firstName: "Please enter the first name."})
        }
        if (lastName === "") {
            errors.push({lastName: "Please enter the last name."})
        }
        if (email === "") {
            errors.push({email: "Please enter the email address."})
        } else if (!emailRegex.test(email)) {
            errors.push({email: "Invalid email format!"})
        }

        return errors
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
                            onChange={(e) => setPhoneNumber(e.target.value.trim())}
                        />
                        <p className='ms-2' style={{color: "red"}}>{ errors.map(error => error.phoneNumber)}</p>
                    </div>
                    <div className='form-group mt-2'>
                        <label>First Name:</label>
                        <input 
                            type='text'
                            className='form-control'
                            placeholder='First Name'
                            onChange={(e) => setFirstName(e.target.value.trim())}
                        />
                        <p className='ms-2' style={{color: "red"}}>{ errors.map(error => error.firstName)}</p>
                    </div>
                    <div className='form-group mt-2'>
                        <label>Last Name:</label>
                        <input 
                            type='text'
                            className='form-control'
                            placeholder='Last Name'
                            onChange={(e) => setLastName(e.target.value.trim())}
                        />
                        <p className='ms-2' style={{color: "red"}}>{ errors.map(error => error.lastName)}</p>
                    </div>
                    <div className='form-group mt-2'>
                        <label>Email:</label>
                        <input 
                            type='email'
                            className='form-control'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value.trim())}
                        />
                        <p className='ms-2' style={{color: "red"}}>{ errors.map(error => error.email)}</p>
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