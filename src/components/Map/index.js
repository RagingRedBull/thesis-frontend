import axios from 'axios'
import { useEffect, useState } from 'react'
import { Stage, Layer, Image } from 'react-konva'
import useImage from 'use-image'
import MessageBox from '../MessageBox'
import SidePanel from '../SidePanel'
import Compartment from './Compartment'
import { useInterval } from '../../services/UseInterval'

const Map = ({ image, hasFloors, floorId, floorOrder, alarmingMode }) => {
    const imageUrl = global.config.server.url + "/images/" + image
    const [map] = useImage(imageUrl)
    const [compartments, setCompartments] = useState([])
    const [detectors, setDetectors] = useState([])
    const [selectedComp, setSelectedComp] = useState(null)
    const [compName, setCompName] = useState(null)
    const [scale, setScale] = useState(1)
    const [message, setMessage] = useState(null)
    const [mlOutput, setMlOutput] = useState([])

    useEffect(() => {
        const getCompartments = async () => {
            if (floorId) {
                axios  
                    .get(global.config.server.url + "/compartment", {
                        params: {
                            floorId: floorId 
                        }
                    })
                    .then((response) => {
                        if (response.data.length < 1) {
                            setMessage("Please add a compartment.")
                            setCompartments(response.data)
                        } else {
                            setMessage(null)
                            setCompartments(response.data)
                        }
                        
                    })
                    .catch((err) => {
                        setMessage("Please add a compartment.")
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
        if (alarmingMode) {
            getMachLearnOutput()
        }
    }, [floorId, alarmingMode])

    useInterval(
        () => {
            if (alarmingMode) {
                getMachLearnOutput()
            }
        },
        5000
      )

    const getMachLearnOutput = async () => {
        axios
          .get(
            global.config.server.url + "/ml/output"
          )
          .then((response) => {
            setMlOutput(response.data)
          })
          .catch((err) => {
            console.log(err)
          }) 
      }

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

    const getCompDetectors = (compId) => {
        var compDetectors = detectors.map((detector) => detector.compartmentId !== null && detector.compartmentId === compId 
            ?
                {...detector}
            :
                null
        ).filter((detector) => detector !== null)

        return compDetectors
    }
    
    return (
        <div className='row m-0 p-0'>
            <SidePanel 
                hidden={ isSelected() } 
                setSelectedComp={ setSelectedComp } 
                detectors={ detectors } 
                compName={ compName } 
                compId={ selectedComp } 
            />
            <div className='col-10 m-0 p-0 d-flex justify-content-center'>
                { hasFloors ? 
                    <div className='m-5'>
                        { message ?
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
                                        <Compartment 
                                            key={ compartment.id }
                                            compartment={ compartment }
                                            isSelected={ compartment.id === selectedComp }
                                            setSelectedComp={ setSelectedComp }
                                            setCompName={ setCompName }
                                            detectors={ getCompDetectors(compartment.id) }
                                            mlOutput={ mlOutput }
                                            floorOrder={ floorOrder }
                                            alarmingMode={ alarmingMode }
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
        </div>
    )
};

export default Map;