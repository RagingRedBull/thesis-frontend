import axios from 'axios'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import MessageBox from "../MessageBox"

function AddDetector({ show, setShow, addNewDetector }) {
    const [detectorId, setDetectorId] = useState(null)
    const [detectorName, setDetectorName] = useState('')
    const [message, setMessage] = useState(null)
    const [dht11, setDht11] = useState(null)
    const [dht22, setDht22] = useState(null)
    const [mq2, setMq2] = useState(null)
    const [mq5, setMq5] = useState(null)
    const [mq7, setMq7] = useState(null)
    const [mq135, setMq135] = useState(null)
    const [fire, setFire] = useState(null)
    const [sound, setSound] = useState(null)
    const [hasConnection, setHasConnection] = useState(false)


    const submit = (e) => {
        e.preventDefault()

        if (detectorId === null) {
            setMessage("Please enter the detector's Mac Address")
            return null
        }

        if (detectorName === '') {
            setMessage("Please enter the name of the detector")
            return null
        }

        if (!hasConnection) {
            setMessage("Unable to establish connection with the detector.")
        }

        addNewDetector(detectorId, detectorName)
        handleClose()
    }

    const getDetectorSensorData = async () => {
        setMessage(null)

        if (detectorId) {
            axios
                .get(global.config.server.url + "/detector/log/latest", { params: { macAddress: detectorId } })
                .then((response) => {
                    response.data.sensorLogSet.map((sensor) => sensor.name === "DHT-11" && setDht11(sensor.temperature))
                    response.data.sensorLogSet.map((sensor) => sensor.name === "DHT-22" && setDht22(sensor.temperature))
                    response.data.sensorLogSet.map((sensor) => sensor.name === "MQ2" && setMq2(sensor.mqValue))
                    response.data.sensorLogSet.map((sensor) => sensor.name === "MQ5" && setMq5(sensor.mqValue))
                    response.data.sensorLogSet.map((sensor) => sensor.name === "MQ7" && setMq7(sensor.mqValue))
                    response.data.sensorLogSet.map((sensor) => sensor.name === "MQ135" && setMq135(sensor.mqValue))
                    response.data.sensorLogSet.map((sensor) => sensor.name === "Fire" && setFire(sensor.temperature))
                    response.data.sensorLogSet.map((sensor) => sensor.name === "Sound" && setSound(sensor.temperature))
                    setHasConnection(true)
                })
                .catch(() => {
                    setMessage("Unable to find detector")
                })
        } else {
            setMessage("Please enter the detector Mac Address")
        }
    }

    const handleClose  = () => {
        setShow(false)
        setMessage(null)
        setDetectorId(null)
        setDetectorName('')
        setDht11(null)
        setDht22(null)
        setMq2(null)
        setMq5(null)
        setMq7(null)
        setMq135(null)
        setFire(null)
        setSound(null)
        setHasConnection(false)
    }

    return (
        <Modal show={ show } onHide={ handleClose }>
            <form onSubmit={ submit }>
                <Modal.Header closeButton>
                    <Modal.Title>Add Detector</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group m-1">
                        { message ? <MessageBox message={ message } /> : null }
                    </div>
                    <div className='form-group'>
                        <label>Mac Address</label>
                        <div className='row'>
                            <div className='col-9'>
                                <input type='text' className='form-control' placeholder='Mac Address' onChange={ (e) => {setDetectorId(e.target.value)} } />
                            </div>
                            <div className='col-3 p-0'>
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-block"
                                    onClick={ () => getDetectorSensorData() }
                                >
                                    Connect
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='form-group mt-2'>
                        <label>Name</label>
                        <input type='text' className='form-control' placeholder='Name' value={ detectorName } onChange={ (e) => {setDetectorName(e.target.value)} } />
                    </div>
                    <div className='mt-2'>
                        <label>Sensor readings</label>
                        <div className='row'>
                            <div className='col-7'>Temp (DHT-11):</div>
                            <div className='col-5'>{ dht11 ? dht11 : "No Temperature"}</div>
                        </div>
                        <div className='row'>
                            <div className='col-7'>Temp2 (DHT-22):</div>
                            <div className='col-5'>{ dht22 ? dht22 : "No Temperature" }</div>
                        </div>
                        <div className='row'>
                            <div className='col-7'>MQ2:</div>
                            <div className='col-5'>{ mq2 ? mq2 : "No gas" }</div>
                        </div>
                        <div className='row'>
                            <div className='col-7'>MQ5:</div>
                            <div className='col-5'>{ mq5 ? mq5 : "No gas"}</div>
                        </div>
                        <div className='row'>
                            <div className='col-7'>MQ7:</div>
                            <div className='col-5'>{ mq7 ? mq7 : "No gas"}</div>
                        </div>
                        <div className='row'>
                            <div className='col-7'>MQ135:</div>
                            <div className='col-5'>{ mq135 ? mq135 : "No gas" }</div>
                        </div>
                        <div className='row'>
                            <div className='col-7'>Fire:</div>
                            <div className='col-5'>{ fire ? fire : "No Fire" }</div>
                        </div>
                        <div className='row'>
                            <div className='col-7'>Sound:</div>
                            <div className='col-5'>{ sound ? sound : "No Sound"}</div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary btn-block"
                        onClick={ handleClose }
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        className="btn btn-success btn-block"
                    >
                        Add Detector
                    </button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default AddDetector