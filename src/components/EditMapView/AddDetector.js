import React from 'react'
import { Modal } from 'react-bootstrap'

function AddDetector({ show, setShow }) {
    const submit = (e) => {
        e.preventDefault()
    }

    const handleClose  = () => {
        setShow(false)
    }

    return (
        <Modal show={ show } onHide={ handleClose }>
            <form onSubmit={ submit }>
                <Modal.Header closeButton>
                    <Modal.Title>Add Detector</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-group'>
                        <label>Mac Address</label>
                        <div className='row'>
                            <div className='col-9'>
                                <input type='text' className='form-control' placeholder='Mac Address' />
                            </div>
                            <div className='col-3 p-0'>
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-block"
                                    onClick={ () => console.log("Connect") }
                                >
                                    Connect
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='form-group mt-2'>
                        <label>Name</label>
                        <input type='text' className='form-control' placeholder='Name' />
                    </div>
                    <div className='mt-2'>
                        <label>Sensor readings</label>
                        <div className='row'>
                            <div className='col-7'>Temp (DHT-11):</div>
                            <div className='col-5'></div>
                        </div>
                        <div className='row'>
                            <div className='col-7'>Temp2 (DHT-22):</div>
                            <div className='col-5'></div>
                        </div>
                        <div className='row'>
                            <div className='col-7'>MQ2:</div>
                            <div className='col-5'></div>
                        </div>
                        <div className='row'>
                            <div className='col-7'>MQ5:</div>
                            <div className='col-5'></div>
                        </div>
                        <div className='row'>
                            <div className='col-7'>MQ7:</div>
                            <div className='col-5'></div>
                        </div>
                        <div className='row'>
                            <div className='col-7'>MQ135:</div>
                            <div className='col-5'></div>
                        </div>
                        <div className='row'>
                            <div className='col-7'>Fire:</div>
                            <div className='col-5'></div>
                        </div>
                        <div className='row'>
                            <div className='col-7'>Sound:</div>
                            <div className='col-5'></div>
                        </div>
                    </div>
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
                        type="submit"
                        className="btn btn-success btn-block"
                    >
                        Add Detector
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default AddDetector