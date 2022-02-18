import logo from '../../images/PRMTS-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'
import { arrayMoveImmutable } from 'array-move'
import AddFloor from './AddFloor'
import EditFloor from './EditFloor'
import axios from "axios"
import DragHandle from './DragHandle'

const SortableItem = sortableElement(({floor, currentFloor, setCurrentFloor}) => (
  <div
    className='btn btn-lg btn-floor w-100 h-5 rounded-0 m-0 row d-flex'
    style={ currentFloor.id === floor.id ? {backgroundColor: '#FFB140'} : null }
    onClick={ () => setCurrentFloor(floor) }
  >
    <DragHandle />
    <div className='col p-0 m-0'>
        <p className='m-0'>{ floor.name }</p>
    </div>
    <div className='col p-0 m-0'>
        <FontAwesomeIcon icon={ faPenSquare } />
    </div>
  </div>
))

const SortableContainer = sortableContainer(({children}) => {
  return <div className='w-100'>{children}</div>;
})

const SideNav = ({ floors, setCurrentFloor, currentFloor, setFloors, handleDelete, handleUpdate}) => {
    const [showAddFloor, setShowAddFloor] = useState(false)
    const [showEditFloor, setShowEditFloor] = useState(false)

    const onSortEnd = async ({oldIndex, newIndex}) => {
        const updFloors = arrayMoveImmutable(floors, oldIndex, newIndex)

        updFloors.forEach((floor, index) => {
            axios.put(global.config.server.url + "/floor/update", {
                id: floor.id,
                name: floor.name,
                description: floor.description,
                imageUrl: floor.imageUrl,
                order: index
            })
        })

        setFloors(updFloors)
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
                    <AddFloor show={ showAddFloor } setShow={ setShowAddFloor } floors={ floors } setFloors={ setFloors } setCurrentFloor={ setCurrentFloor } />
                </div>
                <div>
                    <SortableContainer onSortEnd={ onSortEnd } useDragHandle>
                        { floors.map((floor, index) => (
                            <SortableItem key={ floor.id } index={ index } floor={ floor } currentFloor={ currentFloor } setCurrentFloor={ setCurrentFloor } />
                        ))}
                    </SortableContainer>
                    <EditFloor show={ showEditFloor } setShow={ setShowEditFloor } currentFloor={ currentFloor } handleUpdate={ handleUpdate } deleteFloor={ handleDelete } />
                </div>
            </div>
        </>
    )
}

export default SideNav
