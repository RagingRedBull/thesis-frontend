import axios from 'axios'
import React from 'react'
import { Modal } from 'react-bootstrap'

const EstablishFireOutModal = ({show, setShow}) => {
    const handleClose = () => {
        setShow(false)
    }

    const establishFireOut = async () => {
        axios
            .get(global.config.server.url + "/alarming/update", {
                params: {
                    enableAlarming: false
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    alert("Successfully established fire out.")
                } else {
                    alert("Establishing fire out was unsuccessful.")
                }
            })
            .catch((err => {
                alert("Unable to establish fire out.")
            }))


    }

    return (
        <Modal show={ show } onHide={ handleClose }>
            <Modal.Header>
                <Modal.Title>Establish Fire out</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to establish fire out?
            </Modal.Body>
            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-secondary btn-block"
                    onClick={ handleClose }
                >
                    Close
                </button>
                <button
                    type="button"
                    className="btn btn-success btn-block"
                    onClick={() => {
                        establishFireOut()
                        handleClose()
                    }}
                >
                    Establish
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default EstablishFireOutModal