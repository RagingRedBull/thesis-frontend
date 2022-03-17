import React from 'react'
import { Modal } from 'react-bootstrap'

const DeleteContact = ({show, setShow, contact, deleteContact}) => {
    const handleClose = () => {
        setShow(false)
    }

    const submit = (e) => {
        e.preventDefault()

        deleteContact(contact.id)
        handleClose()
    }

    return (
        <Modal show={ show } onHide={ handleClose }>
            <form onSubmit={ submit }>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Are you sure you want to delete the contact?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                    type='button'
                        className="btn btn-secondary btn-block"
                        onClick={() => handleClose()}
                    >
                        No
                    </button>
                    <button
                        type="submit"
                        className="btn btn-danger btn-block"
                    >
                        Yes
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default DeleteContact