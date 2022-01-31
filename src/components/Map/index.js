import { Stage, Layer, Image, Rect } from 'react-konva'
import UseImage from 'use-image'

const index = ({ image, hasFloors }) => {
    const imageUrl = global.config.server.url + "/images/" + image
    const [map] = UseImage(imageUrl)

    // To be set in useEffect with floor foreign key.
    const compartments = [
        {
            // Insert foreign key for floors
            konvaXCoord: 102,
            konvaYcoord: 109,
            konvaWidth: 245,
            konvaHeight: 167,
            color: "white",
            borderColor: "black",
            // Actual compartment dimensions in meters based on CFAST.
            xCoord: 0,
            yCoord: 0,
            width: 10,
            depth: 10,
            // Compartment Statuses:
        },
        {
            // Insert foreign key for floors
            konvaXCoord: 928,
            konvaYcoord: 109,
            konvaWidth: 245,
            konvaHeight: 167,
            color: "red",
            borderColor: "black",
            // Actual compartment dimensions in meters based on CFAST.
            xCoord: 0,
            yCoord: 0,
            width: 10,
            depth: 10,
        }
    ]
    
    return (
        <div className='m-5 d-flex justify-content-center'>
            <div className='map-wrapper'>
                {/* need to get the width and height of the current div */}
                <Stage width={ 1280 } height={ 720 }>
                    <Layer>
                        <Image image={ map } width={ 1280 } height={ 720 } />
                        { compartments.map((compartment) => (
                            <Rect 
                                x={ compartment.konvaXCoord }
                                y={ compartment.konvaYcoord }
                                width={ compartment.konvaWidth }
                                height={ compartment.konvaHeight }
                                fill={ compartment.color }
                                stroke={ compartment.borderColor }
                                opacity={ "0.5" }
                            />
                        ))}
                    </Layer>
                </Stage>
            </div>
                {/* { hasFloors ? 
                    <img 
                        src={ imageUrl }
                        alt='Map of the current floor'
                        className='map'
                    /> :
                    <p className='p-2'>Please add a floor.</p>
                } */}
        </div>
    )
};

export default index;