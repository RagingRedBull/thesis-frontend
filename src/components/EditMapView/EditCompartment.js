import { useEffect, useState } from 'react'
import { Modal, OverlayTrigger, Popover } from 'react-bootstrap'
import MessageBox from "../MessageBox"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const EditCompartment = ({show, setShow, compartment, updateCompartment, deleteCompartment, detectors, connectDetectorCompartmentId, disconnectDetectorCompartmentId}) => {
    const [name, setName] = useState("")
    const [xdimension, setXdimension] = useState(0)
    const [ydimension, setYdimension] = useState(0)
    const [width, setWidth] = useState(0)
    const [depth, setDepth] = useState(0)
    const [message, setMessage] = useState()
    const [compDetectors, setCompDetectors] = useState([])
    const [removedCompDetectors, setRemovedCompDetectors] = useState([])
    const [unassignedDetectors, setUnassignedDetectors] = useState([])

    useEffect(() => {
        setRemovedCompDetectors([])

        if (compartment) {
            setName(compartment.name)
            setXdimension(compartment.xdimension)
            setYdimension(compartment.ydimension)
            setWidth(compartment.width)
            setDepth(compartment.depth)

            if (detectors) {
                setCompDetectors(detectors.map(
                    (detector) => detector.compartmentId === compartment.id &&
                        {...detector}
                ).filter((detector) => detector !== false))

                setUnassignedDetectors(detectors.map(
                    (detector) => detector.compartmentId === null &&
                        {...detector}
                ).filter((detector) => detector !== false))
            }
        }
        
    }, [show, compartment, detectors])

    const handleClose = () => {
        setName("")
        setXdimension(0)
        setYdimension(0)
        setWidth(0)
        setDepth(0)
        setShow(false)
        setMessage(null)
        setCompDetectors([])
        setRemovedCompDetectors([])
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

        if (compDetectors.length > 0) {
            compDetectors.forEach((detector) => {
                connectDetectorCompartmentId(detector.macAddress, compartment.id)
            })
        }

        if (removedCompDetectors.length > 0) {
            removedCompDetectors.forEach((detector) => {
                disconnectDetectorCompartmentId(detector.macAddress)
            })
        }
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

    const detectorsPopover = (
        <Popover>
            <Popover.Body className='p-0'>
                { unassignedDetectors.map((detector) => detector.compartmentId === null && (
                    <div 
                        key={ detector.macAddress }
                        className='card rounded-0 p-1' 
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setCompDetectors([...compDetectors, {...detector, compartmentId: compartment.id}])
                            setUnassignedDetectors(unassignedDetectors.filter((unassDetector) => unassDetector.macAddress !== detector.macAddress))
                            document.body.click()
                        }}
                    >
                        {detector.name ? detector.name : detector.macAddress}
                    </div>
                ))}
            </Popover.Body>
        </Popover>
    )

    const removeDetector = (detector) => {
        setCompDetectors(compDetectors.filter((compDetector) => compDetector.macAddress !== detector.macAddress))
        setUnassignedDetectors([...unassignedDetectors, {...detector, compartmentId: null}])
        setRemovedCompDetectors([...removedCompDetectors, detector])
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
                    <div className='detectors'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>Detectors</th>
                                </tr>
                            </thead>
                            <tbody>
                                { compartment && compDetectors.map((detector, index) => detector.compartmentId === compartment.id && (
                                    <tr key={ index }>
                                        <th scope='row'>{ index }</th>
                                        <td>{ detector.name ? detector.name : detector.macAddress}</td>
                                        <td>
                                            <FontAwesomeIcon icon={ faTrash } onClick={() => removeDetector(detector)} style={{ cursor: "pointer", color: "red" }} />
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <th scope='row' colSpan={3}>
                                        <OverlayTrigger trigger='click' placement='bottom' overlay={ detectorsPopover } rootClose={ true }>
                                            <div className='detector-add-btn row text-secondary m-0 ps-1' style={{ cursor: "pointer" }}>
                                                <FontAwesomeIcon className='col-auto m-0 p-0' icon={ faPlus } />
                                                <h6 className='col-auto m-0 p-0 ps-1'>Add a detector</h6>
                                            </div>
                                        </OverlayTrigger>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
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
                        type="button"
                        className="btn btn-danger btn-block"
                        onClick={ () => {
                            deleteCompartment(compartment.id)
                            handleClose() 
                        }}
                    >
                        Delete
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