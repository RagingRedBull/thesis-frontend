import { Fragment, useRef, useEffect } from "react"
import { Rect, Transformer } from "react-konva"

const Rectangle = ({ compartment, isSelected, onSelect, updateCompartmentPos, updateCompartmentSize }) => {
    shapeRef = useRef()
    trRef = useRef()

    useEffect(() => {
        if (isSelected) {
            trRef.current.nodes([shapeRef.current])
            trRef.current.getLayer().batchDraw()
        }
    }, [isSelected])

    return (
        <Fragment>
            <Rect 
                onClick={ onSelect }
                onTap={ onSelect }
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
                    updateCompartmentPos(e, compartment.id)
                }}
                onTransformEnd={ (e) => {
                    const node = shapreRef.current
                    const scaleX = node.scaleX()
                    const scaleY = node.scaleY()

                    node.scaleX(1)
                    node.scaleY(1)
                    
                    const newSize = {
                        xkonva: node.x(),
                        ykonva: node.y(),
                        widthKonva: Math.max(5, node.width() * scaleX),
                        heightKonva: Math.max(node.height * scaleY)
                    }

                    updateCompartmentSize(compartment.id, newSize)
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