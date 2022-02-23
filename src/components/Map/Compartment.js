import axios from "axios"
import { Fragment, useEffect, useState } from "react"
import { Rect } from "react-konva"
import { useInterval } from "../../services/UseInterval"

const Compartment = ({ compartment, isSelected, setSelectedComp, setCompName, detectors }) => {
    const [sensorLogSet, setSensorLogSet] = useState([])

    useEffect(() => {
        const getSensorLogSet = async () => {
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
    }, 10000)

    const getCompartmentColor = () => {
        var highTemp = false
        var smoke = false
        var fire = false

        if (sensorLogSet.length > 0) {
            sensorLogSet.forEach((sensor) => {
                if (sensor.type === "DHT" && sensor.temperature > 30) {
                    highTemp = true
                }
                if (sensor.type === "MQ" && sensor.mqValue > 30) {
                    smoke = true
                }
            })
        }

        if (fire) {
            return "red"
        }

        if (smoke && highTemp) {
            return "orange"
        }

        if (highTemp) {
            return "yellow"
        }

        return "white"
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