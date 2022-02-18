import axios from 'axios'
import { useEffect, useState } from 'react'
import { Stage, Layer, Image } from 'react-konva'
import useImage from 'use-image'
import MessageBox from '../MessageBox'
import SidePanel from '../SidePanel'
import PropertiesPanel from './PropertiesPanel'
import Rectangle from './Rectangle'

const Map = ({ image, hasFloors, floorId, currentFloor }) => {
    const imageUrl = global.config.server.url + "/images/" + image
    const [map] = useImage(imageUrl)
    const [compartments, setCompartments] = useState([])
    const [detectors, setDetectors] = useState([])
    const [compDetectors, setCompDetectors] = useState([])
    const [selectedComp, setSelectedComp] = useState(null)
    const [compName, setCompName] = useState(null)
    const [scale, setScale] = useState(1)

    useEffect(() => {
        const getCompartments = async () => {
            if (floorId) {
                axios  
                    .get(global.config.server.url + "/compartment", { params: { floorId: floorId } })
                    .then((response) => {
                        setCompartments(response.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }

        const getDetectors = async () => {
            axios
                .get(global.config.server.url + "/detector/all", { params: { pageNumber: 0, pageSize: 10}})
                .then((response) => {
                    setDetectors(response.data.content)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        getCompartments()
        getDetectors()
        setSelectedComp(null)
    }, [floorId])

    const zoom = (e) => {
        e.evt.preventDefault()

        const scaleBy = 1.02
        const stage = e.target.getStage()
        const oldScale = stage.scaleX()

        const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy
        
        if (newScale < 0.1) {
            setScale(oldScale)
        } else {
            setScale(newScale)
        }
    }

    const checkDeselect = (e) => {
        const clickedStage = e.target === e.target.getStage()
        const clickedImage = e.target.hasName("map")
        
        if (clickedStage) {
            setSelectedComp(null)
        } else if (clickedImage) {
            setSelectedComp(null)
        }
    }

    const isSelected = () => {
        if (selectedComp !== null) {
            return true
        } else {
            return false
        }
    }

    const handleSelectComp = (compartment) => {
        setSelectedComp(compartment.id)
        setCompName(compartment.name)
        getCompDetectors(compartment.id)
    }

    const getCompDetectors = (compId) => {
        axios
            .get(global.config.server.url + "/log/compartment/" + compId + "/")
            .then((response) => {
                setCompDetectors(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const addNewCompartment = (compDetails) => {
        const newCompartment = {
            depth: compDetails.depth,
            heightKonva: 50,
            width: compDetails.width,
            widthKonva: 50,
            xkonva: 0,
            ykonva: 0,
            floorId: floorId,
            name: compDetails.name,
            xdimension: compDetails.xdimension,
            ydimension: compDetails.ydimension
        }

        axios
            .post(global.config.server.url + "/compartment/new", newCompartment)
            .then(response => {
                if (response.status === 200) {
                    setCompartments([...compartments, response.data])
                    setSelectedComp(response.data.id)
                }
            })
            .catch(error => {
                alert("An error has occurred. Unable to add new compartment.")
            })
    }

    const updateCompartment = (updComp) => {
        axios
            .put(global.config.server.url + "/compartment/update", updComp, { params: { floorId: floorId } })
            .then(response => {
                if (response.status === 200) {
                    setCompartments(compartments.map((compartment) => compartment.id === response.data.id
                        ?
                            {...response.data}
                        :
                            compartment
                    ))
                }
            })
            .catch(error => {
                alert("Unable to save new compartment position.")
            })
    }

    const connectDetectorCompartmentId = (detectorId, compId) => {
        axios
            .put(global.config.server.url + "/detector/update/compartment", 
                {
                    detectorUnitId: detectorId,
                    compartmentId: compId,
                }
            )
            .then(response => {
                if (response.status === 200) {
                    setDetectors(detectors.map((detector) => detector.macAddress === detectorId
                        ?
                            {...response.data}
                        :
                            detector
                ))
                }
            })
        
    }

    const disconnectDetectorCompartmentId = (detectorId) => {
        axios
            .put(global.config.server.url + "/detector/update/compartment", 
                {
                    detectorUnitId: detectorId,
                    compartmentId: null,
                }
            )
            .then(response => {
                if (response.status === 200) {
                    setDetectors(detectors.map((detector) => detector.macAddress === detectorId
                        ?
                            {...response.data}
                        :
                            detector
                ))
                }
            })
    }

    const deleteCompartment = async (compId) => {
        const response = await axios.delete(global.config.server.url + "/compartment/" + compId + "/delete")

        if (response.status === 200) {
            setCompartments(compartments.filter((compartment) => compartment.id !== compId))
        } else {
            alert("Error failed to delete compartment")
        }
    }
    
    return (
        <div className='row m-0 p-0'>
            <SidePanel hidden={ isSelected() } setSelectedComp={ setSelectedComp } detectors={ compDetectors } compName={ compName } />
            <div className={isSelected() ? 'col-8 m-0 p-0 d-flex justify-content-center' : 'col-10 m-0 p-0 d-flex justify-content-center'}>
                { hasFloors ? 
                    <div className='m-5'>
                        { compartments.length < 1 & hasFloors ?
                            <div className='' style={{ width: '1280px', position: 'absolute', zIndex: 1}}>
                                <MessageBox message="Please add a compartment." />
                            </div>
                            :
                            null 
                        }
                        <div className='map-wrapper'>
                            <Stage 
                                width={ 1280 } 
                                height={ 720 } 
                                scaleX={ scale } 
                                scaleY={ scale }
                                onWheel={ zoom }
                                onMouseDown={ checkDeselect }
                                onTouchStart={ checkDeselect }
                            >
                                <Layer>
                                    <Image 
                                        image={ map }
                                        name='map'
                                        onMouseDown={ checkDeselect }
                                        onTouchStart={ checkDeselect }
                                    />
                                    { compartments.map((compartment) => (
                                        <Rectangle
                                            key={ compartment.id }
                                            compartment={ compartment }
                                            isSelected={ compartment.id === selectedComp }
                                            handleSelectComp={ handleSelectComp }
                                            updateCompartment={ updateCompartment }
                                        />
                                    ))}
                                </Layer>
                            </Stage>
                        </div>
                    </div>
                    :
                    <MessageBox message="Please add a floor." />
                }
            </div> 
            <PropertiesPanel 
                currentFloor={ currentFloor } 
                compartments={ compartments } 
                selectedComp={ selectedComp } 
                setSelectedComp={ setSelectedComp } 
                handleSelectComp={ handleSelectComp } 
                addNewCompartment={ addNewCompartment } 
                updateCompartment={ updateCompartment } 
                deleteCompartment={ deleteCompartment } 
                detectors={ detectors } 
                connectDetectorCompartmentId={ connectDetectorCompartmentId }
                disconnectDetectorCompartmentId={ disconnectDetectorCompartmentId }
            />
        </div>
    )
};

export default Map