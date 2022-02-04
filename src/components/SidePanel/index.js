import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

const index = ({ hidden, setSelectedComp, detectors }) => {

    return (
        <div className='side_panel col-2 p-0 m-0' hidden={ hidden }>
            <div className='side_pan_head row'>
                <div className='col-10'>
                    <h5>Compartment Name</h5>
                </div>
                <div className='col-2'>
                    <FontAwesomeIcon icon={ faTimes } onClick={ () => { setSelectedComp(null) } } style={{cursor: "pointer"}} />
                </div>
            </div>
            { detectors.map((detector) => (
                <div key={ detector.id }>
                    <div className='side_pan_sub_head'>
                        <h5>{ detector.macAddress }</h5>
                    </div>
                    
                    { detector.sensorLogSet.map((sensor) => (
                        <div key={ sensor.id } className='side_pan_content row'>
                            <div className='col'>{ sensor.name }</div>
                            <div className='col'>{ sensor.temperature }</div>
                        </div>
                    ))}
                </div>
            )) }
        </div>
    )
}

export default index
