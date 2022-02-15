import { Fragment, useRef, useEffect } from "react"
import { Rect, Transformer } from "react-konva"

const Rectangle = ({ compartment, isSelected, handleSelectComp, updateCompartment }) => {
    const shapeRef = useRef()
    const trRef = useRef()

    useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current])
            trRef.current.getLayer().batchDraw()
        }
    }, [isSelected])

    return (
        <Fragment>
            <Rect 
                onClick={ () => handleSelectComp(compartment) }
                onTap={ () => handleSelectComp(compartment) }
                ref= { shapeRef }
                x={ compartment.xkonva }
                y={ compartment.ykonva }
                width={ compartment.widthKonva }
                height={ compartment.heightKonva }
                fill={ isSelected ? "blue" : "white" }
                stroke={ isSelected ? "blue" : "black" }
                strokeWidth={ isSelected ? 5 : 5 }
                opacity={ 0.5 }
                draggable={ isSelected ? true : false }
                onDragEnd={ (e) => {
                    const updComp = {
                        ...compartment,
                        xkonva: e.target.x(),
                        ykonva: e.target.y()
                    }

                    updateCompartment(updComp)
                }}
                onTransformEnd={ (e) => {
                    const node = shapeRef.current
                    const scaleX = node.scaleX()
                    const scaleY = node.scaleY()

                    node.scaleX(1)
                    node.scaleY(1)
                    
                    const updComp = {
                        ...compartment,
                        xkonva: node.x(),
                        ykonva: node.y(),
                        widthKonva: Math.max(5, node.width() * scaleX),
                        heightKonva: Math.max(node.height() * scaleY)
                    }

                    updateCompartment(updComp)
                }}
            />
            { isSelected && (
                <Transformer
                    ref={ trRef }
                    boundBoxFunc={ (oldBox, newBox) => {
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox
                        }

                        return newBox
                    }} 
                />
            )}
        </Fragment>
    )
}

export default Rectangle