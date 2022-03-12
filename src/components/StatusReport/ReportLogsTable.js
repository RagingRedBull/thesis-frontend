import React, { useState } from 'react'

const ReportLogsTable = ({reportLogs, getReportLogs}) => {
    const [date, setDate] = useState(null)
    const [errors, setErrors] = useState([])

    const submit = (e) => {
        e.preventDefault()

        const result = validate({date})
        if (result.length > 0){
            setErrors(result)
            return null
        } else {
            setErrors([])
        }

        getReportLogs(date)
        console.log(reportLogs.length)
        // Insert get dates here
    }

    const validate = (values) => {
        const errors = []

        if (!values.date) {
            errors.push({'date': "Date is required!"})
        }

        return errors
    }

    return (
        <div className='row m-0 p-0' style={{backgroundColor: "white"}}>
            <div>
                <form onSubmit={ submit }>
                    <div className='row w-25 mt-3'>
                        <div className='col'>
                            <label htmlFor='start-date'>Date:</label>
                            <input 
                                type='date' 
                                className='form-control' 
                                id='start-date' 
                                onChange={(e) => {
                                    setDate(e.target.value)
                                }}
                            />
                            <p style={{ color: "red" }}>{ errors.map(error => error.date) }</p>
                        </div>
                        <div className='col'>
                            <button
                                type='submit'
                                className='btn btn-secondary btn-block mt-4'
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                <h2>Status Reports</h2>
                {
                    reportLogs.length > 0 ?
                        <div className='card mb-3'>
                            <div className='card-body'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Time</th>
                                            <th scope='col'>Mac Address</th>
                                            <th scope='col'>DHT-11</th>
                                            <th scope='col'>DHT-22</th>
                                            <th scope='col'>MQ-2</th>
                                            <th scope='col'>MQ-5</th>
                                            <th scope='col'>MQ-7</th>
                                            <th scope='col'>MQ-135</th>
                                            <th scope='col'>Fire</th>
                                            <th scope='col'>Sound</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            reportLogs.map((reportLog, index) => 
                                                <tr key={ index }>
                                                    <th scope='row'>
                                                        { reportLog.start } - { reportLog.end }
                                                    </th>
                                                    <td>
                                                        { reportLog.macAddress}
                                                    </td>
                                                    {
                                                        reportLog.sensorStatusReportLogDtoList.map((sensor, innerIndex) => sensor.sensorName === "DHT-11" &&
                                                        <td key={ innerIndex }>
                                                            <div className='col'>
                                                                Min: { sensor.min ? sensor.min.toFixed(2) : "No value"}
                                                            </div>
                                                            <div className='col'>
                                                                Avg: { sensor.average ? (Math.round(sensor.average * 100) / 100).toFixed(2) : "No value"}
                                                            </div>
                                                            <div className='col'>
                                                                Max: { sensor.max ? sensor.max.toFixed(2) : "No value"}
                                                            </div>
                                                        </td>
                                                        )
                                                    }
                                                    {
                                                        reportLog.sensorStatusReportLogDtoList.map((sensor, innerIndex) => sensor.sensorName === "DHT-22" &&
                                                        <td key={ innerIndex }>
                                                            <div className='col'>
                                                                Min: { sensor.min ? sensor.min.toFixed(2) : "No value"}
                                                            </div>
                                                            <div className='col'>
                                                                Avg: { sensor.average ? (Math.round(sensor.average * 100) / 100).toFixed(2) : "No value"}
                                                            </div>
                                                            <div className='col'>
                                                                Max: { sensor.max ? sensor.max.toFixed(2) : "No value"}
                                                            </div>
                                                        </td>
                                                        )
                                                    }
                                                    {
                                                        reportLog.sensorStatusReportLogDtoList.map((sensor, innerIndex) => sensor.sensorName === "MQ-2" &&
                                                        <td key={ innerIndex }>
                                                            <div className='col'>
                                                                Min: { sensor.min ? sensor.min.toFixed(2) : "No value"}
                                                            </div>
                                                            <div className='col'>
                                                                Avg: { sensor.average ? (Math.round(sensor.average * 100) / 100).toFixed(2) : "No value"}
                                                            </div>
                                                            <div className='col'>
                                                                Max: { sensor.max ? sensor.max.toFixed(2) : "No value"}
                                                            </div>
                                                        </td>
                                                        )
                                                    }
                                                    {
                                                        reportLog.sensorStatusReportLogDtoList.map((sensor, innerIndex) => sensor.sensorName === "MQ-5" &&
                                                        <td key={ innerIndex }>
                                                            <div className='col'>
                                                                Min: { sensor.min ? sensor.min.toFixed(2) : "No value"}
                                                            </div>
                                                            <div className='col'>
                                                                Avg: { sensor.average ? (Math.round(sensor.average * 100) / 100).toFixed(2) : "No value"}
                                                            </div>
                                                            <div className='col'>
                                                                Max: { sensor.max ? sensor.max.toFixed(2) : "No value"}
                                                            </div>
                                                        </td>
                                                        )
                                                    }
                                                    {
                                                        reportLog.sensorStatusReportLogDtoList.map((sensor, innerIndex) => sensor.sensorName === "MQ-7" &&
                                                        <td key={ innerIndex }>
                                                            <div className='col'>
                                                                Min: { sensor.min ? sensor.min.toFixed(2) : "No value"}
                                                            </div>
                                                            <div className='col'>
                                                                Avg: { sensor.average ? (Math.round(sensor.average * 100) / 100).toFixed(2) : "No value"}
                                                            </div>
                                                            <div className='col'>
                                                                Max: { sensor.max ? sensor.max.toFixed(2) : "No value"}
                                                            </div>
                                                        </td>
                                                        )
                                                    }
                                                    {
                                                        reportLog.sensorStatusReportLogDtoList.map((sensor, innerIndex) => sensor.sensorName === "MQ-135" &&
                                                        <td key={ innerIndex }>
                                                            <div className='col'>
                                                                Min: { sensor.min ? sensor.min.toFixed(2) : "No value"}
                                                            </div>
                                                            <div className='col'>
                                                                Avg: { sensor.average ? (Math.round(sensor.average * 100) / 100).toFixed(2) : "No value"}
                                                            </div>
                                                            <div className='col'>
                                                                Max: { sensor.max ? sensor.max.toFixed(2) : "No value"}
                                                            </div>
                                                        </td>
                                                        )
                                                    }
                                                    {
                                                        reportLog.sensorStatusReportLogDtoList.map((sensor, innerIndex) => sensor.sensorName === "FIRE" &&
                                                        <td key={ innerIndex }>
                                                            <div className='col'>
                                                                Min: { sensor.min ? sensor.min.toFixed(2) : "No value"}
                                                            </div>
                                                            <div className='col'>
                                                                Avg: { sensor.average ? (Math.round(sensor.average * 100) / 100).toFixed(2) : "No value"}
                                                            </div>
                                                            <div className='col'>
                                                                Max: { sensor.max ? sensor.max.toFixed(2) : "No value"}
                                                            </div>
                                                        </td>
                                                        )
                                                    }
                                                    {
                                                        reportLog.sensorStatusReportLogDtoList.map((sensor, innerIndex) => sensor.sensorName === "SOUND" &&
                                                        <td key={ innerIndex }>
                                                            <div className='col'>
                                                                Min: { sensor.min ? sensor.min.toFixed(2) : "No value"}
                                                            </div>
                                                            <div className='col'>
                                                                Avg: { sensor.average ? (Math.round(sensor.average * 100) / 100).toFixed(2) : "No value"}
                                                            </div>
                                                            <div className='col'>
                                                                Max: { sensor.max ? sensor.max.toFixed(2) : "No value"}
                                                            </div>
                                                        </td>
                                                        )
                                                    }
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className='card-footer'>
                                <nav>
                                    <ul className="pagination mb-0">
                                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    :
                        <h5>No logs.</h5>
                }
            </div>
        </div>
    )
}

export default ReportLogsTable