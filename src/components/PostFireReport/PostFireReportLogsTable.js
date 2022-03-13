import React from 'react'

const PostFireReportLogsTable = ({postFireLogs, reset, selectedDate}) => {
  return (
    <div className='row m-0 p-0' style={{backgroundColor: "white"}}>
        <div>
            <div className='mt-3'>
                <h2>Post-Fire Reports</h2>
            </div>
            <div className='card m-3'>
                <div className='card-header'>
                    <h5>Date: { selectedDate }</h5>
                </div>
                <div className='card-body'>
                    {
                        // change to postFireLogs.length > 0
                        postFireLogs ?
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Time</th>
                                        <th scope='col'>Compartment Name</th>
                                        <th scope='col'>DHT-11</th>
                                        <th scope='col'>DHT-22</th>
                                        <th scope='col'>MQ-2</th>
                                        <th scope='col'>MQ-5</th>
                                        <th scope='col'>MQ-7</th>
                                        <th scope='col'>MQ-135</th>
                                        <th scope='col'>Fire</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope='row'>{ new Date (postFireLogs.timeOccurred).toTimeString().split(" ")[0] }</th>
                                        <td>{ postFireLogs.compartmentName }</td>
                                        <td>{ postFireLogs.sensorLogSet.some(sensor => sensor.name === "DHT-11") ? postFireLogs.sensorLogSet.map((sensor) => sensor.name === "DHT-11" && "Detected") : "Normal"}</td>
                                        <td>{ postFireLogs.sensorLogSet.some(sensor => sensor.name === "DHT-22") ? postFireLogs.sensorLogSet.map((sensor) => sensor.name === "DHT-22" && "Detected") : "Normal"}</td>
                                        <td>{ postFireLogs.sensorLogSet.some(sensor => sensor.name === "MQ-2") ? postFireLogs.sensorLogSet.map((sensor) => sensor.name === "MQ-2" && "Detected") : "Normal"}</td>
                                        <td>{ postFireLogs.sensorLogSet.some(sensor => sensor.name === "MQ-5") ? postFireLogs.sensorLogSet.map((sensor) => sensor.name === "MQ-5" && "Detected") : "Normal"}</td>
                                        <td>{ postFireLogs.sensorLogSet.some(sensor => sensor.name === "MQ-7") ? postFireLogs.sensorLogSet.map((sensor) => sensor.name === "MQ-7" && "Detected") : "Normal"}</td>
                                        <td>{ postFireLogs.sensorLogSet.some(sensor => sensor.name === "MQ-135") ? postFireLogs.sensorLogSet.map((sensor) => sensor.name === "MQ-135" && "Detected") : "Normal"}</td>
                                        <td>{ postFireLogs.sensorLogSet.some(sensor => sensor.name === "FIRE") ? postFireLogs.sensorLogSet.map((sensor) => sensor.name === "FIRE" && "Detected") : "Normal"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        :
                            <div className='m-2 mb-3'>
                                <h5>No logs.</h5>
                            </div>
                    }
                </div>
                <div className='card-footer'>
                    <button
                        className='btn btn-secondary'
                        onClick={ () => reset()}
                    >
                        Go back
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostFireReportLogsTable