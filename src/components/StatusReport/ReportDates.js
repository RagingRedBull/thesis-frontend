import React, { useState } from 'react'

const ReportDates = ({reportDates}) => {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [errors, setErrors] = useState([])

    const submit = (e) => {
        e.preventDefault()

        const result = validate({startDate, endDate})
        if (result.length > 0){
            setErrors(result)
            return
        } else {
            setErrors([])
        }

        // Insert get dates here
        console.log(startDate)
        console.log(endDate)
    }

    const validate = (values) => {
        const errors = []

        if (!values.startDate) {
            errors.push({'startDate': "Start date is required!"})
        }
        if (!values.endDate) {
            errors.push({'endDate': "End date is required!"})
        }

        return errors
    }

    return (
        <div className='row m-0 p-0' style={{backgroundColor: "white"}}>
            <div>
                <form onSubmit={ submit }>
                    <div className='row w-50 mt-3'>
                        <div className='col'>
                            <label htmlFor='start-date'>Start Date:</label>
                            <input 
                                type='date' 
                                className='form-control' 
                                id='start-date' 
                                onChange={(e) => {
                                    setStartDate(e.target.value)
                                }}
                            />
                            <p style={{ color: "red" }}>{ errors.map(error => error.startDate) }</p>
                        </div>
                        <div className='col'>
                            <label htmlFor='end-date'>End Date:</label>
                            <input 
                                type='date' 
                                className='form-control' 
                                id='end-date' 
                                onChange={(e) => {
                                    setEndDate(e.target.value)
                                }}
                            />
                            <p style={{ color: "red" }}>{ errors.map(error => error.endDate) }</p>
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
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'><h2>Status Reports</h2></th>
                        </tr>
                    </thead>
                    {
                        reportDates ?
                            <tbody>

                            </tbody>
                        :
                            <tbody>
                                <tr>
                                    <td>
                                        <h5>No records.</h5>
                                    </td>
                                </tr>
                            </tbody>
                    }
                    
                </table>
            </div>
        </div>
    )
}

export default ReportDates