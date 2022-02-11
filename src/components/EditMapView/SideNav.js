import logo from '../../images/PRMTS-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import AddFloor from './AddFloor'
import DeleteFloor from './DeleteFloor'
import EditFloor from './EditFloor'

const SideNav = ({ floors, setCurrentFloor, currentFloor, setFloors, handleDelete }) => {
    const [showAddFloor, setShowAddFloor] = useState(false)
    const [showDeleteFloor, setShowDeleteFloor] = useState(false)
    const [showEditFloor, setShowEditFloor] = useState(false)
    const [floorId, setFloorId] = useState(null)

    const deleteFloor = (id) => {
        console.log(id)
        setShowDeleteFloor(true)
        setFloorId(id)
    }

    return (
        <>
            <div className='logo-background'>
                <img 
                    src={ logo }
                    className='img-fluid img-thumbnail logo-background border-0'
                    alt='PRMTS Logo'
                /> 
            </div>
            <div className='floors'>
                <div className='floors-header mb-5 p-1 border-bottom border-dark row w-100'>
                    <div className='col ms-1'>
                        <h3>Floors</h3>
                    </div>
                    <div className='col p-0'>
                        <FontAwesomeIcon className='add-icon' icon={ faPlus } onClick={ () => setShowAddFloor(true) } />
                    </div>
                    <AddFloor show={ showAddFloor } setShow={ setShowAddFloor } floors={ floors } setFloors={ setFloors } />
                </div>
                <div>
                    { floors.map((floor) => (
                        // Should be a unique identifier
                        <div key={ floor.id } className='mt-2' style={currentFloor.id === floor.id ? {backgroundColor: '#FFB140'} : null}> 
                            <div 
                                onClick={ () => setCurrentFloor(floor) }
                                className='btn btn-lg btn-floor w-100 h-5 rounded-0 m-0 row d-flex'
                            > 
                                <div className='col p-0 m-0'>
                                    <FontAwesomeIcon className='trash-icon' icon={ faTrashAlt } onClick={ () => deleteFloor(floor.id) } />
                                </div>
                                <div className='col p-0 m-0'>
                                    <p className='m-0'>{ floor.name }</p>
                                </div>
                                <div className='col p-0 m-0'>
                                    <FontAwesomeIcon icon={ faPenSquare } hidden={currentFloor.id !== floor.id} onClick={ () => setShowEditFloor(true) } />
                                </div>
                            </div>
                        </div>
                    ))}
                    <DeleteFloor show={ showDeleteFloor } setShow={ setShowDeleteFloor } floors={ floors } setFloors={ setFloors } floorId={ floorId } handleDelete={ handleDelete } />
                    <EditFloor show={ showEditFloor } setShow={ setShowEditFloor } currentFloor={ currentFloor } />
                </div>
            </div>
        </>
    )
}

export default SideNav
