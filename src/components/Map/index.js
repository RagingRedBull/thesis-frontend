import React from 'react';

const index = ({ image }) => {
    const imageUrl = global.config.server.url + "/images/" + image
    return (
        <>
            { image ? 
                <img 
                    src={ imageUrl }
                    style={ mapStyle } 
                    alt='Map of the current floor'
                /> :
                <p>No Image</p>
            }
        </>
    )
};

const mapStyle = {
    height: '720px',
    width: '100%'
}

export default index;