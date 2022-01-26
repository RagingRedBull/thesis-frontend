import React from 'react';

const index = ({ floors, setCurrentFloor }) => {
    return (
        <div style={ sideNavStyle }>
            <p>This is the side Nav</p>
            { floors.map((floor) => (
                <div key={ floor.id.toString() }>
                    <button 
                        onClick={ () => setCurrentFloor(floor) }
                    > { floor.desc } </button>
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
