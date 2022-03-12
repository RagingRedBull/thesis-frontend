import React, { useState } from 'react'

const ReportDates = ({reportLogs, getReportLogs}) => {
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
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    {
                        reportLogs ?
                        <>
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
                                <tr>
                                    <td scope='col'>
                                        2:10pm
                                    </td>
                                    <td scope='col'>
                                        3C:61:05:D0:A5:B1
                                    </td>
                                    <td scope='col'>
                                        <div className='col'>
                                            Min: 100
                                        </div>
                                        <div className='col'>
                                            Avg: 100
                                        </div>
                                        <div className='col'>
                                            Max: 100
                                        </div>
                                    </td>
                                    <td scope='col'>
                                        <div className='col'>
                                            Min: 100
                                        </div>
                                        <div className='col'>
                                            Avg: 100
                                        </div>
                                        <div className='col'>
                                            Max: 100
                                        </div>
                                    </td>
                                    <td scope='col'>
                                        <div className='col'>
                                            Min: 100
                                        </div>
                                        <div className='col'>
                                            Avg: 100
                                        </div>
                                        <div className='col'>
                                            Max: 100
                                        </div>
                                    </td>
                                    <td scope='col'>
                                        <div className='col'>
                                            Min: 100
                                        </div>
                                        <div className='col'>
                                            Avg: 100
                                        </div>
                                        <div className='col'>
                                            Max: 100
                                        </div>
                                    </td>
                                    <td scope='col'>
                                        <div className='col'>
                                            Min: 100
                                        </div>
                                        <div className='col'>
                                            Avg: 100
                                        </div>
                                        <div className='col'>
                                            Max: 100
                                        </div>
                                    </td>
                                    <td scope='col'>
                                        <div className='col'>
                                            Min: 100
                                        </div>
                                        <div className='col'>
                                            Avg: 100
                                        </div>
                                        <div className='col'>
                                            Max: 100
                                        </div>
                                    </td>
                                    <td scope='col'>
                                        <div className='col'>
                                            Min: 100
                                        </div>
                                        <div className='col'>
                                            Avg: 100
                                        </div>
                                        <div className='col'>
                                            Max: 100
                                        </div>
                                    </td>
                                    <td scope='col'>
                                        <div className='col'>
                                            Min: 100
                                        </div>
                                        <div className='col'>
                                            Avg: 100
                                        </div>
                                        <div className='col'>
                                            Max: 100
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </>
                        :
                            <thead>
                                <tr>
                                    <th scope='col'>No logs.</th>
                                </tr>
                            </thead>
                    }
                    
                </table>
            </div>
        </div>
    )
}

export default ReportDates