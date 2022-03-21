import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import MessageBox from '../MessageBox'
import axios from 'axios'
import { useInterval } from "../../services/UseInterval"

const SidePanel = ({ hidden, setSelectedComp, detectors, compName, compId }) => {
    const [compDetectors, setCompDetectors] = useState([])
    const [detectorData, setDetectorData] = useState([])

    useEffect(() => {
        if (!!(detectors)) {
            var tempDetectors = detectors.map((detector) => detector.compartmentId !== null && detector.compartmentId === compId && {...detector}).filter((detector) => detector !== false)
            setCompDetectors(tempDetectors)
            tempDetectors.forEach((detector) => {
                axios.get(global.config.server.url + "/detector/log/latest", { params: { macAddress: detector.macAddress } })
                    .then((response) => {
                        setDetectorData(response.data)
                    })
                    .catch(() => {
                        console.log("Unable to find sensors")
                    })
            })
        }
    }, [detectors, compId])

    useInterval(async () => {
        if (!!(detectors)) {
            var tempDetectors = detectors.map((detector) => detector.compartmentId !== null && detector.compartmentId === compId && {...detector}).filter((detector) => detector !== false)
            setCompDetectors(tempDetectors)
            tempDetectors.forEach((detector) => {
                axios.get(global.config.server.url + "/detector/log/latest", { params: { macAddress: detector.macAddress } })
                    .then((response) => {
                        console.log(response.data.timeRecorded)
                        setDetectorData(response.data)
                    })
                    .catch(() => {
                        console.log("Unable to find sensors")
                    })
            })
        }
    }, 1000)

    const isCompTriggered = () => {
        var isTriggered = false

        if (compDetectors.length > 0) {
            if (detectorData) {
                if (detectorData.sensorLogSet) {
                    detectorData.sensorLogSet.forEach((sensor) => {
                        if(sensor.type === "DHT"){
                            if(sensor.name === "DHT-11") {
                                if (sensor.temperature > 33) {
                                    isTriggered = true;
                                } 
                            }
                            else if (sensor.name === "DHT-22") {
                                if (sensor.temperature > 33) {
                                    isTriggered = true;
                                } 
                            }
                        }
                        else if(sensor.type === "MQ") {
                            if(sensor.name === "MQ-2") {
                                if (sensor.mqValue > 535) {
                                    isTriggered = true;
                                } 
                            }
                            else if (sensor.name === "MQ-5") {
                                if (sensor.mqValue > 405) {
                                    isTriggered = true;
                                } 
                            }
                            else if (sensor.name === "MQ-7") {
                                if (sensor.mqValue > 570) {
                                    isTriggered = true;
                                } 
                            }
                            else if (sensor.name === "MQ-135") {
                                if (sensor.mqValue > 260) {
                                    isTriggered = true;
                                } 
                            }
                        }
                        else if(sensor.type === "FIRE"){
                            if(sensor.sensorValue > 180){
                                isTriggered = true;
                            } 
                        }
                    })
                }
            }
        }

        return isTriggered
    }

    return (
        <Collapse in={ hidden } dimension="width">
            <div className='side_panel col-2 p-0 m-0 border'>
                <div className='side_pan_head row m-0' style={isCompTriggered() ? { backgroundColor: " #ED7014", color: "white" } : null}>
                    <div className='col-10'>
                        <h5>{ compName ? compName : "Compartment Name" }</h5>
                    </div>
                    <div className='col-2'>
                        <FontAwesomeIcon icon={ faTimes } onClick={ () => { setSelectedComp(null) } } style={{cursor: "pointer"}} />
                    </div>
                </div>
                { compDetectors.length > 0 ? 
                    compDetectors.map((detector) => (
                        <div key={ detector.macAddress }>
                            <div className='side_pan_sub_head' style={{backgroundColor: "#000000"}}>
                                <h5 className='m-0 ms-3' style={{color: "white"}}>{ detector.macAddress }</h5>
                            </div>
                            {!!(detectorData) &&
                                detectorData.macAddress === detector.macAddress ?
                                    <div className='mt-2'> 
                                        <div className='row'>
                                            <div className='col'>Temp (DHT-11):</div>
                                            <div className='col'>
                                                { detectorData.sensorLogSet.some(sensor => sensor.name === "DHT-11") ? 
                                                        detectorData.sensorLogSet.map((sensor) => sensor.name === "DHT-11" && sensor.temperature) 
                                                    : 
                                                        "No Temp"
                                                }
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>Temp2 (DHT-22):</div>
                                            <div className='col'>{ detectorData.sensorLogSet.some(sensor => sensor.name === "DHT-22") ? detectorData.sensorLogSet.map((sensor) => sensor.name === "DHT-22" && sensor.temperature) : "No Temp" }</div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>MQ-2:</div>
                                            <div className='col'>{ detectorData.sensorLogSet.some(sensor => sensor.name === "MQ-2") ? detectorData.sensorLogSet.map((sensor) => sensor.name === "MQ-2" && sensor.mqValue) : "No Smoke/Gas" }</div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>MQ-5:</div>
                                            <div className='col'>{ detectorData.sensorLogSet.some(sensor => sensor.name === "MQ-5") ? detectorData.sensorLogSet.map((sensor) => sensor.name === "MQ-5" && sensor.mqValue) : "No Smoke/Gas" }</div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>MQ-7:</div>
                                            <div className='col'>{ detectorData.sensorLogSet.some(sensor => sensor.name === "MQ-7") ? detectorData.sensorLogSet.map((sensor) => sensor.name === "MQ-7" && sensor.mqValue) : "No Smoke/Gas"}</div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>MQ-135:</div>
                                            <div className='col'>{ detectorData.sensorLogSet.some(sensor => sensor.name === "MQ-135") ? detectorData.sensorLogSet.map((sensor) => sensor.name === "MQ-135" && sensor.mqValue) : "No Smoke/Gas"}</div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>Fire:</div>
                                            <div className='col'>{ detectorData.sensorLogSet.some(sensor => sensor.name === "FIRE") ? detectorData.sensorLogSet.map((sensor) => sensor.name === "FIRE" && sensor.sensorValue) : "No Fire"}</div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>Sound:</div>
                                            <div className='col'>{ detectorData.sensorLogSet.some(sensor => sensor.name === "SOUND") ? detectorData.sensorLogSet.map((sensor) => sensor.name === "SOUND" && sensor.sound) : "No Sound" }</div>
                                        </div>
                                    </div>
                                :
                                <div className='mt-2'> 
                                    <div className='row'>
                                        <div className='col'>Temp (DHT-11):</div>
                                        <div className='col'>{ "No temperature" }</div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>Temp2 (DHT-22):</div>
                                        <div className='col'>{ "No Temperature" }</div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>MQ2:</div>
                                        <div className='col'>{ "No Smoke/Gas" }</div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>MQ5:</div>
                                        <div className='col'>{ "No Smoke/Gas"}</div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>MQ7:</div>
                                        <div className='col'>{ "No Smoke/Gas"}</div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>MQ135:</div>
                                        <div className='col'>{ "No Smoke/Gas" }</div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>Fire:</div>
                                        <div className='col'>{ "No Fire" }</div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>Sound:</div>
                                        <div className='col'>{ "No Sound"}</div>
                                    </div>
                                </div>
                            }
                        </div>
                    ))
                    :
                    <div className='m-4'>
                        <MessageBox message={ "No detectors detected." } />
                    </div>
                }
            </div>
        </Collapse>
    )
}

export default SidePanel
