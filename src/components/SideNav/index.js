import React from 'react';

const index = ({ floors, setCurrentFloor }) => {
    return (
        <div style={ sideNavStyle }>
            <p>This is the side Nav</p>
            { floors.map((floor) => (
                // Should be a unique identifier
                <div key={ floor.name }> 
                    <button 
                        onClick={ () => setCurrentFloor(floor) }
                        className='btn btn-secondary'
                    > 
                        { floor.name } 
                    </button>
                </div>
            ))}
        </div>
    )
}

const sideNavStyle = {
    backgroundColor: 'pink',
    height: '100%',
    textAlign: 'center'
    
}

export default index;
