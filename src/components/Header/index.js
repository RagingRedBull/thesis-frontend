const index = () => {
    const buildName = "Test Building"
    return (
        <div className='header row m-0' style={ headerStyle }>
            <div className='col-8'>
                <h3 className='proj-name pt-3 ps-5'>FIRE ALARM CONTROL UNIT |</h3>
            </div>
            <div className='col-4 pt-4'>
                <h4 className="build-name">{ buildName }</h4>
            </div>
        </div>
    )
};

const headerStyle = {
    backgroundColor: '#FFB140',
    height: '100px'
}

export default index;
