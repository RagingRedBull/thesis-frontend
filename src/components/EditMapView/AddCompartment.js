import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import MessageBox from "../MessageBox"

const AddCompartment = ({show, setShow, addNewCompartment}) => {
    const [compDetails, setCompDetails] = useState({
        name: null,
        xdimension: null,
        ydimension: null,
        width: null,
        depth: null
    })
    const [message, setMessage] = useState()

    const handleClose = () => {
        setCompDetails({
            name: null,
            xdimension: null,
            ydimension: null,
            width: null,
            depth: null
        })
        setShow(false)
        setMessage(null)
    }

    const floatRegExp = new RegExp('^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$')

    const submit = (e) => {
        e.preventDefault()

        if (compDetails.name === null) {
            setMessage("Please enter the compartment's name")
            return null
        }
        if (compDetails.xdimension === null) {
            setMessage("Please enter the x coordinate of the compartment in meters.")
            return null
        }
        if (!floatRegExp.test(compDetails.xdimension)) {
            setMessage("X coordinate must be numeric!")
            return null
        }
        if (compDetails.ydimension === null) {
            setMessage("Please enter the y coordinate of the compartment in meters.")
            return null
        }
        if (!floatRegExp.test(compDetails.ydimension)) {
            setMessage("Y coordinate must be numeric!")
            return null
        }
        if (compDetails.width === null) {
            setMessage("Please enter the width of the compartment in meters")
            return null
        }
        if (!floatRegExp.test(compDetails.width)) {
            setMessage("Width must be numeric!")
            return null
        }
        if (compDetails.depth === null) {
            setMessage("Please enter the depth of the compartment in meters")
            return null
        }
        if (!floatRegExp.test(compDetails.depth)) {
            setMessage("Depth must be numeric!")
            return null
        }
        
        addNewCompartment(compDetails)
        handleClose()
    }

    return (
        <Modal show={ show } onHide={ handleClose }>
            <form onSubmit={ submit }>
                <Modal.Header closeButton>
                    <Modal.Title>Add Compartment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group m-1">
                        { message ? <MessageBox message={ message } /> : null }
                    </div>
                    <div className='form-group'>
                        <label>Name</label>
                        <input 
                            type='text'
                            className='form-control'
                            placeholder='New Compartment'
                            onChange={(e) => setCompDetails({...compDetails, name: e.target.value})}
                        />
                    </div>
                    <div className='form-group mt-1 row'>
                        <label>Coordinates</label>
                        <div className='col'>
                            <div className='input-group'>
                                <div className='input-group-prepend'>
                                    <div className='input-group-text'>x</div>
                                </div>
                                <input 
                                    type='text' 
                                    placeholder={ 0 }
                                    onChange={(e) => setCompDetails({...compDetails, xdimension: e.target.value})}
                                    style={{width: "50px"}}
                                    min={ 0 }
                                />
                                <div className='input-group-prepend'>
                                    <div className='input-group-text'>m</div>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='input-group'>
                                <div className='input-group-prepend'>
                                    <div className='input-group-text'>y</div>
                                </div>
                                <input 
                                    type='text' 
                                    placeholder={ 0 }
                                    onChange={(e) => setCompDetails({...compDetails, ydimension: e.target.value})}
                                    style={{width: "50px"}}
                                    min={ 0 }
                                />
                                <div className='input-group-prepend'>
                                    <div className='input-group-text'>m</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='form-group mt-1 row'>
                        <label>Dimension</label>
                        <div className='col'>
                            <div className='input-group'>
                                <div className='input-group-prepend'>
                                    <div className='input-group-text'>width</div>
                                </div>
                                <input 
                                    type='text' 
                                    placeholder={ 0 }
                                    onChange={(e) => setCompDetails({...compDetails, width: e.target.value})}
                                    style={{width: "50px"}}
                                    min={ 0 }
                                />
                                <div className='input-group-prepend'>
                                    <div className='input-group-text'>m</div>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='input-group'>
                                <div className='input-group-prepend'>
                                    <div className='input-group-text'>depth</div>
                                </div>
                                <input 
                                    type='text' 
                                    placeholder={ 0 }
                                    onChange={(e) => setCompDetails({...compDetails, depth: e.target.value})}
                                    style={{width: "50px"}}
                                    min={ 0 }
                                />
                                <div className='input-group-prepend'>
                                    <div className='input-group-text'>m</div>
                                </div>
                            </div>
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
                        Add Compartment
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default AddCompartment