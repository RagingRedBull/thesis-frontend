import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'

const PropertiesPanel = ({currentFloor, compartments, selectedComp}) => {
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
                <input
                    type='text'
                    className="form-control"
                    value={ currentFloor.name }
                    disabled
                />
            </div>
            <div className='floor-description mb-1'>
                <label>Description:</label>
                <input
                    type='text'
                    className="form-control"
                    value={ currentFloor.description }
                    disabled
                />
            </div>
            <div className='floor-img'>
                <label>Map:</label>
                <h6 style={ imgUrlStyle }>{ currentFloor.imageUrl }</h6>
            </div>
        </div>
        <div className='compartments m-1'>
            <h5>Compartments</h5>
            {compartments.map((compartment) => (
                <div key={ compartment.id } className="text-center" style={compartment.id === selectedComp ? {backgroundColor: '#FFB140'} : null}>
                    <h6>{ compartment.name }</h6>
                </div>
            ))}
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