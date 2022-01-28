const index = ({ image }) => {
    const imageUrl = global.config.server.url + "/images/" + image
    return (
        <div className='m-5 d-flex justify-content-center'>
            { image ? 
                <img 
                    src={ imageUrl }
                    alt='Map of the current floor'
                    className='img-map'
                /> :
                <p className='p-2'>Please select a floor.</p>
            }
        </div>
    )
};

export default index;