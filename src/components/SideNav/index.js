import logo from '../../images/PRMTS-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

const index = ({ floors, setCurrentFloor, selFloorId }) => {
    return (
        <>
            <div className='logo'>
                <img 
                    src={ logo }
                    className='img-fluid img-thumbnail logo border-0'
                    alt='PRMTS Logo'
                /> 
            </div>
            <div className='mb-5 side_nav_header'>
                <h3>Floors</h3>
            </div>
            <div>
                { floors.map((floor) => (
                    // Should be a unique identifier
                    <div key={ floor.id } className='mt-2' style={selFloorId === floor.id ? {backgroundColor: '#FFB140'} : null}> 
                        <button 
                            onClick={ () => setCurrentFloor(floor) }
                            className='btn btn-lg btn_floor w-100 h-5 rounded-0 m-0 row d-flex'
                        > 
                            <div className='col p-0 ps-5 m-0'>
                                <p className='m-0'>{ floor.name }</p>
                            </div>
                            <div className='col p-0 ps-4 m-0'>
                                <FontAwesomeIcon icon={ faAngleRight } hidden={selFloorId !== floor.id} />
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default index;
