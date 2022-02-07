import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

const index = () => {
    const buildName = "Test Building"
    return (
        <div className='header row m-0 pe-0' style={ headerStyle }>
            <div className='col-8 p-0 mt-3'>
                <h3 className='proj-name pt-3 ps-5'>FIRE ALARM CONTROL UNIT |</h3>
            </div>
            <div className='col-3 p-0 pt-4 mt-3'>
                <h4 className="build-name">{ buildName }</h4>
            </div>
            <div className='col-1 mt-3'>
                <div className='row h-100'>
                    <div className='col p-0' style={ iconContainerStyle }>
                        <FontAwesomeIcon className="" icon={ faCog } style={ iconStyle } />
                    </div>
                    <div className='col p-0' style={ iconContainerStyle }>
                        <FontAwesomeIcon className="" icon={ faCog } style={ iconStyle } />
                    </div>
                </div>
            </div>
        </div>
    )
};

const headerStyle = {
    backgroundColor: '#FFB140',
    height: "125px"
}

const iconContainerStyle = {
    marginTop: "20px",
    marginBottom: "10px",
    paddingRight: "10px"
}

const iconStyle = {
    color: "#FFFFFF",
    backgroundColor: "#000000",
    borderRadius: "100%",
    padding: "10px",
    height: "60px",
    width: "60px"
}

export default index;
