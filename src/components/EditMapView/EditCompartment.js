import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import MessageBox from "../MessageBox"

const EditCompartment = ({show, setShow, compartment, updateCompartment}) => {
    const [name, setName] = useState("")
    const [xdimension, setXdimension] = useState(0)
    const [ydimension, setYdimension] = useState(0)
    const [width, setWidth] = useState(0)
    const [depth, setDepth] = useState(0)
    const [message, setMessage] = useState()

    useEffect(() => {
        if (compartment) {
            setName(compartment.name)
            setXdimension(compartment.xdimension)
            setYdimension(compartment.ydimension)
            setWidth(compartment.width)
            setDepth(compartment.depth)
        }
        
    }, [show, compartment])

    const handleClose = () => {
        setName("")
        setXdimension(0)
        setYdimension(0)
        setWidth(0)
        setDepth(0)
        setShow(false)
        setMessage(null)
    }

    const handleUpdate = () => {
        const updComp = {
            ...compartment,
            name: name,
            xdimension: xdimension,
            ydimension: ydimension,
            width: width,
            depth: depth,
        }

        updateCompartment(updComp)
    }

    const submit = (e) => {
        e.preventDefault()

        if (name === null) {
            setMessage("Please enter the compartment's name")
            return null
        }
        if (xdimension === null) {
            setMessage("Please enter the actual x coordinate of the compartment in meters")
            return null
        }
        if (ydimension === null) {
            setMessage("Please enter the actual y coordinate of the compartment in meters")
            return null
        }
        if (width === null) {
            setMessage("Please enter the width of the compartment in meters")
        }
        if (depth === null) {
            setMessage("Please enter the depth of the compartment in meters")
            return null
        }

        handleUpdate()
        handleClose()
    }

    return (
        <Modal show={ show } onHide={ handleClose }>
            <form onSubmit={ submit }>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Compartment</Modal.Title>
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
                            value={ name }
                            onChange={(e) => setName(e.target.value)}
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
                                    type='number' 
                                    placeholder={ 0 }
                                    onChange={(e) => setXdimension(e.target.value)}
                                    style={{width: "50px"}}
                                    value={ xdimension }
                                    min={ 0 }
                                />
                            </div>
                        </div>
                        <div className='col'>
                            <div className='input-group'>
                                <div className='input-group-prepend'>
                                    <div className='input-group-text'>y</div>
                                </div>
                                <input 
                                    type='number' 
                                    placeholder={ 0 }
                                    onChange={(e) => setYdimension(e.target.value)}
                                    style={{width: "50px"}}
                                    value={ ydimension }
                                    min={ 0 }
                                />
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
                                    type='number' 
                                    placeholder={ 0 }
                                    onChange={(e) => setWidth(e.target.value)}
                                    style={{width: "50px"}}
                                    value={ width }
                                    min={ 0 }
                                />
                            </div>
                        </div>
                        <div className='col'>
                            <div className='input-group'>
                                <div className='input-group-prepend'>
                                    <div className='input-group-text'>depth</div>
                                </div>
                                <input 
                                    type='number' 
                                    placeholder={ 0 }
                                    onChange={(e) => setDepth(e.target.value)}
                                    style={{width: "50px"}}
                                    value={ depth }
                                    min={ 0 }
                                />
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
                        Save
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default EditCompartment