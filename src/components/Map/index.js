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
                <div className="card">
                    <p className='p-2'>Please select a floor.</p>
                </div>
            }
        </div>
    )
};

export default index;