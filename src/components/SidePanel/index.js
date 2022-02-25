import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import MessageBox from '../MessageBox'
import axios from 'axios'

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

    return (
        <Collapse in={ hidden } dimension="width">
            <div className='side_panel col-2 p-0 m-0 border'>
                <div className='side_pan_head row m-1'>
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
                                            <div className='col'>{ !!(detectorData.sensorLogSet[0]) ? detectorData.sensorLogSet[0].temperature : "No temperature" }</div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>Temp2 (DHT-22):</div>
                                            <div className='col'>{ !!(detectorData.sensorLogSet[1]) ? detectorData.sensorLogSet[1].temperature : "No Temperature" }</div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>MQ2:</div>
                                            <div className='col'>{ !!(detectorData.sensorLogSet[2]) ? detectorData.sensorLogSet[2].mqValue : "No gas" }</div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>MQ5:</div>
                                            <div className='col'>{ !!(detectorData.sensorLogSet[3]) ? detectorData.sensorLogSet[3].mqValue : "No gas"}</div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>MQ7:</div>
                                            <div className='col'>{ !!(detectorData.sensorLogSet[4]) ? detectorData.sensorLogSet[4].mqValue : "No gas"}</div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>MQ135:</div>
                                            <div className='col'>{ !!(detectorData.sensorLogSet[5]) ? detectorData.sensorLogSet[5].mqValue : "No gas" }</div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>Fire:</div>
                                            <div className='col'>{ !!(detectorData.sensorLogSet[6]) ? detectorData.sensorLogSet[6].temperature : "No Fire" }</div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>Sound:</div>
                                            <div className='col'>{ !!(detectorData.sensorLogSet[7]) ? detectorData.sensorLogSet[7].temperature : "No Sound"}</div>
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
                                        <div className='col'>{ "No gas" }</div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>MQ5:</div>
                                        <div className='col'>{ "No gas"}</div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>MQ7:</div>
                                        <div className='col'>{ "No gas"}</div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>MQ135:</div>
                                        <div className='col'>{ "No gas" }</div>
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
