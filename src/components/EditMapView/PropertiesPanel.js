import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import AddCompartment from './AddCompartment'
import EditCompartment from './EditCompartment'
import AddDetector from './AddDetector'
import axios from 'axios'

const PropertiesPanel = ({currentFloor, compartments, selectedComp, handleSelectComp, addNewCompartment, updateCompartment, deleteCompartment, detectors, connectDetectorCompartmentId, disconnectDetectorCompartmentId, addNewDetector}) => {
    const [showAddCompartment, setShowAddCompartment] = useState(false)
    const [showEditCompartment, setShowEditCompartment] = useState(false)
    const [showAddDetector, setShowAddDetector] = useState(false)
    const [currentCompartment, setCurrentCompartment] = useState(null)
    const [isCompsSelected, setIsCompSelected] = useState(true)
    const [isDetectorsSelected, setIsDetectsSelected] = useState(false)
    const [floorDetectors, setFloorDetectors] = useState([])

    useEffect(() => {
        const getFloorDetectors = async () => {
            if (currentFloor) {
                axios  
                    .get(global.config.server.url + "/floor/" + currentFloor.id + "/detectors")
                    .then((response) => {
                        setFloorDetectors(response.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }

        if (selectedComp) {
            setIsCompSelected(true)
            setIsDetectsSelected(false)
        }

        getFloorDetectors()
        
    }, [selectedComp, currentFloor, detectors])

    return (
        <div className='side_panel col-2 p-0 m-0'>
            <div className='info-panel-header row m-0 border-bottom border-dark'>
                <div className='col-10 m-0 p-3'>
                    <h4>Floor Properties</h4>
                </div>
                <div className='col-2 m-0 p-0 pt-3'>
                    <FontAwesomeIcon className='w-100 h-50' icon={ faPenSquare } />
                </div>
            </div>
            <div className='floor-info m-3 mb-5'>
                <div className='floor-name mb-1'>
                    <label>Name:</label>
                    <p>{ currentFloor.name }</p>
                </div>
                <div className='floor-description mb-1'>
                    <label>Description:</label>
                    <p>{ currentFloor.description }</p>
                </div>
                <div className='floor-img'>
                    <label>Map:</label>
                    <h6 style={ imgUrlStyle }>{ currentFloor.imageUrl }</h6>
                </div>
            </div>
            <div className='row m-0 w-100 border-bottom border-dark'>
                <div 
                    className='col p-0'
                    style={ isCompsSelected ? {backgroundColor: '#FFB140', cursor: "default"} : {cursor: "pointer"}}
                    onClick={ () => {
                        setIsCompSelected(true)
                        setIsDetectsSelected(false)
                    }}
                >
                    <h5 className='content-title mt-2 ps-1'>Compartments</h5>
                </div>
                <div 
                    className='col p-0'
                    style={ isDetectorsSelected ? {backgroundColor: '#FFB140', cursor: "default"} : {cursor: "pointer"}}
                    onClick={ () => {
                        setIsCompSelected(false)
                        setIsDetectsSelected(true)
                    }}
                >
                    <h5 className='content-title mt-2 ps-1'>Detectors</h5>
                </div>
            </div>
            <div className='content'>
                { isCompsSelected &&
                    <>
                        {compartments.map((compartment) => (
                            <div 
                                key={ compartment.id }
                                className="row m-0"
                                style={compartment.id === selectedComp ? {backgroundColor: '#FFB140', cursor: "pointer"} : {cursor: "pointer"}}
                                onClick={() => {
                                    handleSelectComp(compartment)
                                    setCurrentCompartment(compartment)
                                }}
                            >
                                <div className='col-8 pt-1'>
                                    <h6>{ compartment.name }</h6>
                                </div>
                                {compartment.id === selectedComp 
                                    ?
                                        <div className='col-4 pt-1'>
                                            <FontAwesomeIcon icon={ faPenSquare } onClick={ () => setShowEditCompartment(true) } />
                                        </div>
                                    :
                                        null
                                }
                            </div>
                        ))}
                        <div className='compartment-add-btn row text-secondary m-0 ps-1' style={{ cursor: "pointer" }} onClick={ () => setShowAddCompartment(true) } >
                            <FontAwesomeIcon className='col-auto m-0 p-0' icon={ faPlus } />
                            <h6 className='col-auto m-0 p-0 ps-1'>Add a compartment</h6>
                        </div>
                    </>
                }
                { isDetectorsSelected &&
                    <>
                        <div className='overflow-auto' style={{height: "200px"}}>
                            { floorDetectors.map((detector) => detector.compartmentId !== null && (
                                <div key={ detector.macAddress } className="ps-3">
                                    <h6 style={{color: "green"}}>{ detector.name ? detector.name : detector.macAddress }</h6>
                                </div>
                            ))}
                        </div>
                        <div className='ps-1' style={{backgroundColor: "grey"}}>
                            <h5>Unassigned Detectors</h5>
                        </div>
                        <div className='overflow-auto' style={{height: "200px"}}>
                            { detectors.map((detector) => detector.compartmentId === null && (
                                <div key={ detector.macAddress } className="ps-3">
                                    <h6>{ detector.name ? detector.name : detector.macAddress }</h6>
                                </div>
                            ))}
                            {/* <div className='detector-add-btn row text-secondary m-0 ps-1' style={{ cursor: "pointer" }} onClick={ () => setShowAddDetector(true)} >
                                <FontAwesomeIcon className='col-auto m-0 p-0' icon={ faPlus } />
                                <h6 className='col-auto m-0 p-0 ps-1'>Add a detector</h6>
                            </div> */}
                        </div>
                    </>
                }
                
                <AddCompartment show={ showAddCompartment } setShow={ setShowAddCompartment } addNewCompartment={ addNewCompartment } />
                <EditCompartment 
                    show={ showEditCompartment } 
                    setShow={ setShowEditCompartment } 
                    compartment={ currentCompartment } 
                    updateCompartment={ updateCompartment } 
                    deleteCompartment={ deleteCompartment } 
                    detectors={ detectors } 
                    connectDetectorCompartmentId={ connectDetectorCompartmentId }
                    disconnectDetectorCompartmentId={ disconnectDetectorCompartmentId }
                />
                <AddDetector 
                    show={ showAddDetector }
                    setShow={ setShowAddDetector }
                    addNewDetector={ addNewDetector }
                />
            </div>
        </div>
    )
}

const imgUrlStyle = {
    width: "200px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
}

export default PropertiesPanel