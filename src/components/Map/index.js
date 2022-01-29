const index = ({ image, hasFloors }) => {
    const imageUrl = global.config.server.url + "/images/" + image
    return (
        <div className='m-5 d-flex justify-content-center'>
            { hasFloors ? 
                <img 
                    src={ imageUrl }
                    alt='Map of the current floor'
                    className='img-map'
                /> :
                <p className='p-2'>Please add a floor.</p>
            }
        </div>
    )
};

export default index;