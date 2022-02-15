import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import AddCompartment from './AddCompartment'
import { useState } from 'react'

const PropertiesPanel = ({currentFloor, compartments, selectedComp, handleSelectComp, addNewCompartment}) => {
    const [showAddCompartment, setShowAddCompartment] = useState(false)

    return (
        <div className='side_panel col-2 p-0 m-0'>
            <div className='info-panel-header row m-0 border-bottom border-dark'>
                <div className='col-10 m-0 p-3'>
                    <h4>Floor Properties</h4>
                </div>
                <div className='col-2 m-0 p-0 pt-3'>
                    <FontAwesomeIcon className='w-100 h-50' icon={ faPenSquare } />
                </div>
            </div>
            <div className='floor-info m-3 mb-5'>
                <div className='floor-name mb-1'>
                    <label>Name:</label>
                    <p>{ currentFloor.name }</p>
                </div>
                <div className='floor-description mb-1'>
                    <label>Description:</label>
                    <p>{ currentFloor.description }</p>
                </div>
                <div className='floor-img'>
                    <label>Map:</label>
                    <h6 style={ imgUrlStyle }>{ currentFloor.imageUrl }</h6>
                </div>
            </div>
            <div className='compartments ms-2'>
                <h5 className='compartments-header'>Compartments</h5>
                <div className='compartments-body ms-2'>
                    {compartments.map((compartment) => (
                        <div 
                            key={ compartment.id } 
                            style={compartment.id === selectedComp ? {backgroundColor: '#FFB140', cursor: "pointer"} : {cursor: "pointer"}}
                            onClick={() => handleSelectComp(compartment)}
                        >
                            <h6>{ compartment.name }</h6>
                        </div>
                    ))}
                    <div className='compartment-add-btn row text-secondary m-0' style={{ cursor: "pointer" }} onClick={ () => setShowAddCompartment(true) } >
                        <FontAwesomeIcon className='col-5 m-0 p-0' icon={ faPlus } />
                        <h6 className='col-7 m-0 p-0 ps-1'>Add a compartment</h6>
                    </div>
                    <AddCompartment show={ showAddCompartment } setShow={ setShowAddCompartment } addNewCompartment={ addNewCompartment } />
                </div>
            </div>
        </div>
    )
}

const imgUrlStyle = {
    width: "200px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
}

export default PropertiesPanel