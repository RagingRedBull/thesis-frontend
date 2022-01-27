const index = () => {
    const buildName = "Test Building"
    return (
        <div className='header' style={ headerStyle }>
            <div className='row'>
                <div className='col'>
                    <h3>FIRE ALARM CONTROL UNIT</h3>
                </div>
                <div className='col'>
                    <h4>{ buildName }</h4>
                </div>
            </div>
        </div>
    )
};

const headerStyle = {
    backgroundColor: 'yellow',
    width: '100%'
}

export default index;
