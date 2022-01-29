import logo from '../../images/PRMTS-logo.png'

const index = ({ floors, setCurrentFloor, selFloorName }) => {
    return (
        <>
            <div className='logo m-1'>
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
                    <div key={ floor.name } className='mt-2'> 
                        <button 
                            onClick={ () => setCurrentFloor(floor) }
                            className='btn btn-lg btn_floor w-100 h-5 rounded-0'
                            style={selFloorName === floor.name ? {backgroundColor: '#FFB140'} : null}
                        > 
                            { floor.name } 
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default index;
