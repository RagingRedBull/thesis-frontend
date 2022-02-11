import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Collapse } from 'react-bootstrap'
import MessageBox from '../MessageBox'

const index = ({ hidden, setSelectedComp, detectors, compName }) => {

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
                { detectors.length > 0 ? 
                    detectors.map((detector) => (
                        <div key={ detector.id }>
                            <div className='side_pan_sub_head' style={{backgroundColor: "#000000"}}>
                                <h5 className='m-0 ms-3' style={{color: "white"}}>{ detector.macAddress }</h5>
                            </div>
                            
                            { detector.sensorLogSet.length > 0 ?
                                detector.sensorLogSet.map((sensor) => (
                                    <div key={ sensor.id } className='side_pan_content row ms-3'>
                                        <div className='col-7'>{ sensor.name }:</div>
                                        <div className='col-5'>{ sensor.temperature }</div>
                                    </div>
                                ))
                                :
                                <div className='m-4'>
                                    <MessageBox message={ "No detectors detected." } />
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

export default index
