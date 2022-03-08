import axios from "axios"
import { Fragment, useEffect, useState } from "react"
import { Rect } from "react-konva"
import { useInterval } from "../../services/UseInterval"

const Compartment = ({ compartment, isSelected, setSelectedComp, setCompName, detectors, setAlarmingMode, mlOutput, floorOrder }) => {
    const [sensorLogSet, setSensorLogSet] = useState([])
    const [currentTimeRecorded, setCurrentTimeRecorded] = useState(null)
    const [prevTimeRecorded, setPrevTimeRecorded] = useState(null)

    useEffect(() => {
        const getSensorLogSet = async () => {
            if (detectors.length > 0) {
                axios
                    .get(global.config.server.url + "/detector/log/latest", { params: { macAddress: detectors[0].macAddress }})
                    .then((response) => {
                        setSensorLogSet(response.data.sensorLogSet)
                        setCurrentTimeRecorded(response.data.timeRecorded)
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
                    setPrevTimeRecorded(currentTimeRecorded)
                    setCurrentTimeRecorded(response.data.timeRecorded)
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
                if (sensor.type === "DHT" && sensor.temperature > 30) {
                    highTemp = true
                }
                if (sensor.type === "MQ" && sensor.mqValue > 300) {
                    smoke = true
                }
            })
        }

        if (fire) {
            if (prevTimeRecorded) {
                if (prevTimeRecorded !== currentTimeRecorded) {
                    setAlarmingMode(true)
                }
            } else {
                setAlarmingMode(true)
            }

            return "red"
        }

        if (smoke && highTemp) {
            if (prevTimeRecorded) {
                if (prevTimeRecorded !== currentTimeRecorded) {
                    setAlarmingMode(true)
                }
            } else {
                setAlarmingMode(true)
            }

            return "orange"
        } 

        if (isMlOutputOverlap()) {
            return "red"
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
        </Fragment>
    )
}

export default Compartment