import React from 'react';

const index = () => {
    return (
        <div style={ sideNavStyle }>
            <p>This is the side Nav</p>
            {/* add the pagination here */}
        </div>
    )
}

const sideNavStyle = {
    backgroundColor: 'pink',
    height: '100%'
}

export default index;
