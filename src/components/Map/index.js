import axios from 'axios'
import { useEffect, useState } from 'react'
import { Stage, Layer, Image, Rect } from 'react-konva'
import useImage from 'use-image'
import MessageBox from '../MessageBox'

const Map = ({ image, hasFloors, floorId }) => {
    const imageUrl = global.config.server.url + "/images/" + image
    const [map] = useImage(imageUrl)
    const [compartments, setCompartments] = useState([])
    const [scale, setScale] = useState(1)

    useEffect(() => {
        getCompartments()
    }, [])

    const getCompartments = async () => {
        axios  
            .get(global.config.server.url + "/floor/2/compartment") // id is currently hardcoded until it is returned.
            .then((response) => {
                setCompartments(response.data)
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

        setScale(newScale)
    }
    
    return (
        <div className='m-5 d-flex justify-content-center'>
            {hasFloors ? 
                <div className='map-wrapper'>
                    {/* need to get the width and height of the current div */}
                    <Stage 
                        width={ 1280 } 
                        height={ 720 } 
                        scaleX={ scale } 
                        scaleY={ scale }
                        onWheel={ zoom }
                    >
                        <Layer>
                            <Image image={ map } />
                            { compartments.map((compartment, index) => (
                                <Rect 
                                    key={ index }
                                    x={ compartment.xKonva }
                                    y={ compartment.yKonva }
                                    width={ compartment.widthKonva }
                                    height={ compartment.heightKonva }
                                    fill={ "white" }
                                    stroke={ "black" }
                                    opacity={ 0.5 }
                                />
                            ))}
                        </Layer>
                    </Stage>
                </div>
                :
                <MessageBox message="Please add a floor." />
            }
        </div>
    )
};

export default Map;