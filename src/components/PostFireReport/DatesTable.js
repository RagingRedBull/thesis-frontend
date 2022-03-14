import React from 'react'

const DatesTable = ({dates, getLogs}) => {
  return (
    <div className='row m-0 p-0' style={{backgroundColor: "white"}}>
      <div>
        <div className='mt-3'>
          <h2>Post-Fire Reports</h2>
        </div>
        <div className='card m-3'>
          <div className='card-body'>
            {
              dates > 0 ?
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope='col'>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dates.map((date, index) => (
                        <tr key={ index }>
                          <th scope='row'>
                            <div onClick={ () => { getLogs(date) }} style={{cursor: "pointer"}}>
                              { (new Date (date.timeOccurred)).toLocaleDateString() + " " + (new Date (date.timeOccurred)).toLocaleTimeString() }
                            </div>
                          </th>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              :
                <div className='m-2 mb-3'>
                  <h5>No logs.</h5>
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatesTable