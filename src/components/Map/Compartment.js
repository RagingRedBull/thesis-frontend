import axios from "axios"
import { Fragment, useEffect, useState } from "react"
import { Rect, Image } from "react-konva"
import useImage from "use-image"
import { useInterval } from "../../services/UseInterval"
import smokeImage from "../../images/smoke_icon.png"
import tempImage from "../../images/temp_icon.png"

const Compartment = ({ compartment, isSelected, setSelectedComp, setCompName, detectors, mlOutput, floorOrder, alarmingMode }) => {
    const [sensorLogSet, setSensorLogSet] = useState([])
    const [smokeIcon] = useImage(smokeImage)
    const [tempIcon] = useImage(tempImage)
    const [isSmoke, setIsSmoke] = useState(false)
    const [isHighTemp, setIsHighTemp] = useState(false)
    const [isFire, setIsFire] = useState(false);
    const [isSound, setIsSound] = useState(false);

    useEffect(() => {
        const getSensorLogSet = async () => {
            if (detectors.length > 0) {
                axios
                    .get(global.config.server.url + "/detector/log/latest", { params: { macAddress: detectors[0].macAddress }})
                    .then((response) => {
                        setSensorLogSet(response.data.sensorLogSet)
                        response.data.sensorLogSet.forEach((sensor) => {
                            if(sensor.type === "DHT"){
                                if(sensor.name === "DHT-11" && sensor.temperature > 30){
                                    setIsHighTemp(true)
                                }
                                else if (sensor.name === "DHT-22" && sensor.temperature > 30){
                                    setIsHighTemp(true)
                                }
                                else{
                                    setIsHighTemp(false)
                                }
                            }
                            else if(sensor.type === "MQ"){
                                if(sensor.name === "MQ-2" && sensor.mq_value > 300){
                                    setIsSmoke(true)
                                }
                                else if (sensor.name === "MQ-5" && sensor.mq_value > 300){
                                    setIsSmoke(true)
                                }
                                else if (sensor.name === "MQ-7" && sensor.mq_value > 300){
                                    setIsSmoke(true)
                                }
                                else if (sensor.name === "MQ-135" && sensor.mq_value > 300){
                                    setIsSmoke(true)
                                }
                                else{
                                    setIsSmoke(false)
                                }
                            }
                            else if(sensor.type === "FIRE"){
                                if(sensor.name === "FIRE" && sensor.flame_value > 80){
                                    setIsFire(true)
                                }
                                else{
                                    setIsFire(false)
                                }
                            }
                            else if(sensor.type === "SOUND"){
                                if(sensor.name === "SOUND" && (sensor.sound_value < 80 && sensor.sound_value > 88 )){
                                    setIsSound(true)
                                }
                                else{
                                    setIsSound(false)
                                }
                            }
                        })
                    })
                    .catch((err) => {
                        console.log("No sensors ")
                    })
            }
        }
        getSensorLogSet()
    }, [detectors])

    useInterval(async () => {
        console.log("Checking for updates on sensors.")
        if (detectors.length > 0) {
            axios
                .get(global.config.server.url + "/detector/log/latest", { params: { macAddress: detectors[0].macAddress }})
                .then((response) => {
                    setSensorLogSet(response.data.sensorLogSet)
                })
                .catch((err) => {
                    console.log(compartment.id + ": No sensors ")
                })
        }
    }, 5000)

    const getCompartmentColor = () => {
        var highTemp = false
        var smoke = false
        var fire = false

        if (sensorLogSet.length > 0) {
            sensorLogSet.forEach((sensor) => {
                if(sensor.type === "DHT"){
                    if(sensor.name === "DHT-11" && sensor.temperature > 30){
                        highTemp = true
                    }
                    else if (sensor.name === "DHT-22" && sensor.temperature > 30){
                        highTemp = true
                    }
                    else{
                        highTemp = false
                    }
                }
                else if(sensor.type === "MQ"){
                    if(sensor.name === "MQ-2" && sensor.mq_value > 300){
                        smoke = true
                    }
                    else if (sensor.name === "MQ-5" && sensor.mq_value > 300){
                        smoke = true
                    }
                    else if (sensor.name === "MQ-7" && sensor.mq_value > 300){
                        smoke = true
                    }
                    else if (sensor.name === "MQ-135" && sensor.mq_value > 300){
                        smoke = true
                    }
                    else{
                        smoke = false
                    }
                }
                else if(sensor.type === "FIRE"){
                    if(sensor.name === "FIRE" && sensor.flame_value > 80){
                        fire = true                    
                    }
                    else{
                        fire = false
                    }
                }
            })
        }

        if (fire) {
            return "red"
        }

        if (smoke && highTemp) {
            return "orange"
        } 
        
        if (smoke) {
            return "yellow"
        }

        return "white"
    }

    const isWithin = (origin, start, end) => {
        if (origin >= start && origin <= end) {
            return true
        } else {
            return false
        }
    }

    const isMlOutputOverlap = () => {
        if ((isWithin(compartment.xdimension, mlOutput.xstart, mlOutput.xend) || isWithin(mlOutput.xstart, compartment.xdimension, compartment.xdimension + compartment.width)) && (isWithin(compartment.ydimension, mlOutput.ystart, mlOutput.yend) || isWithin(mlOutput.ystart, compartment.ydimension, compartment.ydimension + compartment.depth)) && (isWithin(floorOrder, mlOutput.floorStart, mlOutput.floorEnd))) {
            return true
        } else {
            return false
        }
    }

    return (
        <Fragment>
            <Rect 
                onClick={ () => {
                    setSelectedComp(compartment.id)
                    setCompName(compartment.name)
                }}
                onTap={ () => {
                    setSelectedComp(compartment.id)
                    setCompName(compartment.name)
                }}
                x={ compartment.xkonva }
                y={ compartment.ykonva }
                width={ compartment.widthKonva }
                height={ compartment.heightKonva }
                fill={ isSelected ? "blue" : getCompartmentColor() }
                stroke={ isSelected ? "blue" : "black" }
                strokeWidth={ isSelected ? 5 : 5 }
                opacity={ 0.5 }
            />
            { alarmingMode && isMlOutputOverlap() && isSmoke && 
                <Image 
                    image={ smokeIcon }
                    x={ isHighTemp ? compartment.xkonva + compartment.widthKonva / 2 : compartment.xkonva + compartment.widthKonva / 2 + compartment.widthKonva / 4 }
                    y={ compartment.ykonva + compartment.heightKonva / 2 + compartment.heightKonva / 4}
                    width={ compartment.widthKonva / 6 }
                    height={ compartment.heightKonva / 6}
                />
            }
            { alarmingMode && isMlOutputOverlap() && isHighTemp && 
                <Image 
                    image={ tempIcon }
                    x={ compartment.xkonva + compartment.widthKonva / 2 + compartment.widthKonva / 4}
                    y={ compartment.ykonva + compartment.heightKonva / 2 + compartment.heightKonva / 4}
                    width={ compartment.widthKonva / 6 }
                    height={ compartment.heightKonva / 6}
                />
            }
        </Fragment>
    )
}

export default Compartment