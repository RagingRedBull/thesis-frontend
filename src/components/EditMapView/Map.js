import axios from 'axios'
import { useEffect, useState } from 'react'
import { Stage, Layer, Image, Rect } from 'react-konva'
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
    const [selectedComp, setSelectedComp] = useState(null)
    const [compName, setCompName] = useState(null)
    const [scale, setScale] = useState(1)

    useEffect(() => {
        const getCompartments = async () => {
            if (floorId) {
                axios  
                    .get(global.config.server.url + "/floor/" + floorId + "/compartment")
                    .then((response) => {
                        setCompartments(response.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }

        getCompartments()
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
        getDetectors(compartment.id)
    }

    const getDetectors = (compId) => {
        axios
            .get(global.config.server.url + "/log/compartment/" + compId + "/")
            .then((response) => {
                setDetectors(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const addNewCompartment = () => {
        const newCompartment = {
            id: (compartments[compartments.length - 1].id + 1),
            depth: 0,
            heightKonva: 50,
            width: 0,
            widthKonva: 50,
            xkonva: 0,
            ykonva: 0,
            floorId: floorId,
            name: "New compartment"
        }
        // newCompartment.id will not be saved. It is just a temporary id until the compartments are saved.

        console.log(compartments.length - 1)
        console.log(compartments[compartments.length - 1].id)
        console.log(newCompartment.id)

        setCompartments([...compartments, newCompartment])
        setSelectedComp(newCompartment.id)
    }

    // Updates position of compartment in the map
    const updateCompartmentPos = (e, id) => {
        console.log(e.target.x())
        console.log(e.target.y())
        console.log(id)

        setCompartments(compartments.map((compartment) => compartment.id === id
            ?
                {...compartment, xkonva: e.target.x(), ykonva:  e.target.y()}
            :
                compartment
        ))
    }

    const updateCompartmentSize = (id, newSize) => {
        console.log(newSize)
        console.log(id)

        setCompartments(compartments.map((compartment) => compartment.id === id
            ?
                {
                    ...compartment,
                    xkonva: newSize.xkonva,
                    ykonva: newSize.ykonva,
                    widthKonva: newSize.widthKonva,
                    heightKonva: newSize.heightKonva
                }
            :
                compartment
        ))
    }
    
    return (
        <div className='row m-0 p-0'>
            <SidePanel hidden={ isSelected() } setSelectedComp={ setSelectedComp } detectors={ detectors } compName={ compName } />
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
                                            updateCompartmentPos={ updateCompartmentPos }
                                            updateCompartmentSize={ updateCompartmentSize }
                                        />
                                        // <Rect 
                                        //     key={ compartment.id }
                                        //     x={ compartment.xkonva }
                                        //     y={ compartment.ykonva }
                                        //     width={ compartment.widthKonva }
                                        //     height={ compartment.heightKonva }
                                        //     fill={ compartment.id === selectedComp ? "blue" : "white" }
                                        //     stroke={ compartment.id === selectedComp ? "blue" : "black" }
                                        //     strokeWidth={ compartment.id === selectedComp ? 5 : 5 }
                                        //     opacity={ 0.5 }
                                        //     draggable={ compartment.id === selectedComp ? true : false }
                                        //     onClick={ () => {
                                        //         handleSelectComp(compartment)
                                        //     }}
                                        //     onDragEnd={ (e) => {
                                        //         updateCompartmentPos(e, compartment.id)
                                        //     }}
                                        // />
                                    ))}
                                </Layer>
                            </Stage>
                        </div>
                    </div>
                    :
                    <MessageBox message="Please add a floor." />
                }
            </div>
            <PropertiesPanel currentFloor={ currentFloor } compartments={ compartments } selectedComp={ selectedComp } setSelectedComp={ setSelectedComp } handleSelectComp={ handleSelectComp } addNewCompartment={ addNewCompartment } />
        </div>
    )
};

export default Map;