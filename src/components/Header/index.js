import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { OverlayTrigger, Popover } from 'react-bootstrap'

const Header = ({alarmingMode}) => {
    const buildName = "Test Building"

    const infoPopover = (
        <Popover className='w-100'>
            <Popover.Header>Legend</Popover.Header>
            <Popover.Body className='p-2'>
                <div id='red' className='m-0 p-0'>
                    <h6 className='m-0' style={{color:'red'}}><i>RED</i></h6>
                    <p>Fire in the area is considered <u>dangerous</u></p>
                </div>
                <div id='orange' className='m-0 p-0'>
                    <h6 className='m-0' style={{color:'orange'}}><i>ORANGE</i></h6>
                    <p>Smoke and very high temperature is present</p>
                </div>
                <div id='yellow' className='m-0 p-0'>
                    <h6 className='m-0' style={{color:'yellow'}}><i>YELLLOW</i></h6>
                    <p>Smoke</p>
                </div>
                <div id='white' className='m-0 p-0'>
                    <h6 className='m-0'><i>WHITE / no color</i></h6>
                    <p>Normal condition</p>
                </div>
            </Popover.Body>
        </Popover>
    )

    return (
        <div className='header row m-0 pe-0' style={ alarmingMode ? headerAlarmingStyle : headerStyle }>
            <div className='col-8 p-0 mt-3'>
                <h3 className='proj-name pt-3 ps-5'>FIRE ALARM CONTROL UNIT |</h3>
            </div>
            <div className='col-3 p-0 pt-4 mt-3'>
                <h4 className="build-name">{ buildName }</h4>
            </div>
            <div className='col-1 mt-3'>
                <div className='row h-100'>
                    <OverlayTrigger trigger='click' placement='bottom' overlay={ infoPopover }>
                        <div className='d-flex justify-content-center' style={ iconContainerStyle }>
                            <FontAwesomeIcon className="" icon={ faInfoCircle } style={ iconStyle } />
                        </div>
                    </OverlayTrigger>
                </div>
            </div>
        </div>
    )
};

const headerStyle = {
    backgroundColor: '#FFB140',
    height: "125px"
}

const headerAlarmingStyle = {
    backgroundColor: "#FB3640",
    height: "125px",
    color: "white"
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
    width: "60px",
    cursor: "pointer"
}

export default Header;
