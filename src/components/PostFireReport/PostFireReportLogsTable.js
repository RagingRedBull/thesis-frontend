import React from 'react'

const PostFireReportLogsTable = ({postFireLogs, reset, selectedDate, totalPages, pageNumber, getNextPostFireLogs, getPrevPostFireLogs, getLastPostFireLogs, getFirstPostFireLogs}) => {
  return (
    <div className='row m-0 p-0' style={{backgroundColor: "white"}}>
        <div>
            <div className='mt-3'>
                <h2>Post-Fire Reports</h2>
            </div>
            <div className='card m-3'>
                <div className='card-header'>
                    <div style={{float: "left"}}>
                        <h5>Timeline: {  (new Date (selectedDate.timeOccurred)).toLocaleDateString() + " " 
                        + (new Date (selectedDate.timeOccurred)).toLocaleTimeString() + " - " 
                        + (new Date (selectedDate.fireOut)).toLocaleDateString() + " " 
                        + (new Date (selectedDate.fireOut)).toLocaleTimeString()}</h5>
                    </div>
                    <div style={{float: "right"}}>
                        <button
                            className='btn btn-secondary'
                            onClick={ () => reset()}
                        >
                            Go back
                        </button>
                    </div>
                </div>
                <div className='card-body'>
                    {
                        // change to postFireLogs.length > 0
                        postFireLogs ?
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Date Time</th>
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
                                    {
                                        postFireLogs.map((log) => (
                                            <tr key={ log.timeDetected }>
                                                <th scope='row'>{ (new Date (log.timeDetected)).toLocaleDateString() + " " + (new Date (log.timeDetected)).toLocaleTimeString() }</th>
                                                <td>{ log.compartmentName }</td>
                                                <td className={ log.dht11 ? "table-danger" : null}>{ log.dht11 ? "Detected" : "No Detection"}</td>
                                                <td className={ log.dht22 ? "table-danger" : null}>{ log.dht22 ? "Detected" : "No Detection"}</td>
                                                <td className={ log.mq2 ? "table-danger" : null}>{ log.mq2 ? "Detected" : "No Detection"}</td>
                                                <td className={ log.mq5 ? "table-danger" : null}>{ log.mq5 ? "Detected" : "No Detection"}</td>
                                                <td className={ log.mq7 ? "table-danger" : null}>{ log.mq7 ? "Detected" : "No Detection"}</td>
                                                <td className={ log.mq135 ? "table-danger" : null}>{ log.mq135 ? "Detected" : "No Detection"}</td>
                                                <td className={ log.fire ? "table-danger" : null}>{ log.fire ? "Detected" : "No Detection"}</td>
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
                <div className='card-footer'>
                    <div className='mt-2' style={{float: "left"}}>
                        <h6>Showing Page { pageNumber + 1 } of { totalPages }</h6>
                    </div>
                    <div style={{float: "right"}}>
                        <nav>
                            <ul className="pagination mb-0">
                                <li className={ pageNumber === 0 ? "page-item disabled" : "page-item"}><button className="page-link" onClick={() => getFirstPostFireLogs() }>{"<<"}</button></li>
                                <li className={ pageNumber === 0 ? "page-item disabled" : "page-item"}><button className="page-link" onClick={() => getPrevPostFireLogs() }>{"<"}</button></li>
                                <li className="page-item disabled"><button className="page-link" style={{color: "black"}}>{ pageNumber + 1 }</button></li>
                                <li className={pageNumber === totalPages - 1 ? "page-item disabled" : "page-item"}><button className="page-link" onClick={() => getNextPostFireLogs() }>{">"}</button></li>
                                <li className={pageNumber === totalPages - 1 ? "page-item disabled" : "page-item"}><button className="page-link" onClick={() => getLastPostFireLogs() }>{">>"}</button></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostFireReportLogsTable