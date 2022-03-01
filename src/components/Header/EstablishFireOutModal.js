import React from 'react'
import { Modal } from 'react-bootstrap'

const EstablishFireOutModal = ({show, setShow, setAlarmingMode}) => {
    const handleClose = () => {
        setShow(false)
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
                        setAlarmingMode(false)
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