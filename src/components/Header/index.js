import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faInfoCircle, faWrench, faBell, faFileAlt as faFileAltSol, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faFileAlt as faFileAltReg } from '@fortawesome/free-regular-svg-icons'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import UserService from "../../services/UserService"
import { useState } from 'react'
import EstablishFireOutModal from './EstablishFireOutModal'
import EnableFireDrillModal from './EnableFireDrillModal'
import DisableFireDrillModal from './DisableFireDrillModal'

const Header = ({alarmingMode, fireDrillMode}) => {
    const buildName = "Test Building"
    const [showEstablishFireOutModal, setShowEstablishFireOutModal] = useState(false)
    const [showEnableFireDrillModal, setShowEnableFireDrillModal] = useState(false)
    const [showDisableFireDrillModal, setShowDisableFireDrillModal] = useState(false)

    const cogPopover = (
        <Popover className='w-100' style={{ width: "170px"}}>
            <Popover.Body className='p-0 w-100'>
                { UserService.isLoggedIn() ?
                    alarmingMode ?
                        <>
                            <div className='card rounded-0' style={{cursor: "pointer"}} onClick={() => setShowEstablishFireOutModal(true)}>
                                <div className='card-body row p-0 m-0'> 
                                    <div className='col-2 p-0 ps-1 m-0 mt-1'>
                                        <FontAwesomeIcon icon={ faSignInAlt } style={ settingsIconStyle } />
                                    </div>
                                    <div className='col-10 p-0 m-0 fs-5'>
                                        Establish Fire Out
                                    </div>
                                </div>
                            </div>
                            <div className='card rounded-0' style={{cursor: "pointer"}} onClick={() => UserService.doLogout()}>
                                <div className='card-body row p-0 m-0'> 
                                    <div className='col-2 p-0 ps-1 m-0 mt-1'>
                                        <FontAwesomeIcon icon={ faSignInAlt } style={ settingsIconStyle } />
                                    </div>
                                    <div className='col-10 p-0 m-0 fs-5'>
                                        Logout
                                    </div>
                                </div>
                            </div>
                        </>
                    :
                        <>
                            <Link to="/edit-map" style={ linkStyle }>
                                <div className='card rounded-0 w-100' style={{cursor: "pointer"}}>
                                    <div className='card-body row p-0 m-0'> 
                                        <div className='col-2 p-0 ps-1 m-0 mt-1'>
                                            <FontAwesomeIcon icon={ faWrench } style={ settingsIconStyle } />
                                        </div>
                                        <div className='col-10 p-0 m-0 fs-5'>
                                            Maintenance Mode
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            {
                                fireDrillMode ?
                                    <div className='card rounded-0' style={{cursor: "pointer"}} onClick={() => setShowDisableFireDrillModal(true)}>
                                        <div className='card-body row p-0 m-0'> 
                                            <div className='col-2 p-0 ps-1 m-0 mt-1'>
                                                <FontAwesomeIcon icon={ faBell } style={ settingsIconStyle } />
                                            </div>
                                            <div className='col-10 p-0 m-0 fs-5'>
                                                Disable Fire Drill mode
                                            </div>
                                        </div>
                                    </div>
                                :
                                    <div className='card rounded-0' style={{cursor: "pointer"}} onClick={() => setShowEnableFireDrillModal(true)}>
                                        <div className='card-body row p-0 m-0'> 
                                            <div className='col-2 p-0 ps-1 m-0 mt-1'>
                                                <FontAwesomeIcon icon={ faBell } style={ settingsIconStyle } />
                                            </div>
                                            <div className='col-10 p-0 m-0 fs-5'>
                                                Enable Fire Drill mode
                                            </div>
                                        </div>
                                    </div>
                            }
                            
                            <Link to="/status-logs" style={ linkStyle }>
                                <div className='card rounded-0' style={{cursor: "pointer"}}>
                                    <div className='card-body row p-0 m-0'> 
                                        <div className='col-2 p-0 ps-1 m-0 mt-1'>
                                            <FontAwesomeIcon icon={ faFileAltReg } style={ settingsIconStyle } />
                                        </div>
                                        <div className='col-10 p-0 m-0 fs-5'>
                                            Status reports
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div className='card rounded-0' style={{cursor: "pointer"}}>
                                <div className='card-body row p-0 m-0'> 
                                    <div className='col-2 p-0 ps-1 m-0 mt-1'>
                                        <FontAwesomeIcon icon={ faFileAltSol } style={ settingsIconStyle } />
                                    </div>
                                    <div className='col-10 p-0 m-0 fs-5'>
                                        Post-fire reports
                                    </div>
                                </div>
                            </div>
                            <div className='card rounded-0' style={{cursor: "pointer"}} onClick={() => UserService.doLogout()}>
                                <div className='card-body row p-0 m-0'> 
                                    <div className='col-2 p-0 ps-1 m-0 mt-1'>
                                        <FontAwesomeIcon icon={ faSignInAlt } style={ settingsIconStyle } />
                                    </div>
                                    <div className='col-10 p-0 m-0 fs-5'>
                                        Logout
                                    </div>
                                </div>
                            </div>
                        </>   
                :
                    <div className='card rounded-0' style={{cursor: "pointer"}} onClick={() => UserService.doLogin()}>
                        <div className='card-body row p-0 m-0'> 
                            <div className='col-2 p-0 ps-1 m-0 mt-1'>
                                <FontAwesomeIcon icon={ faSignInAlt } style={ settingsIconStyle } />
                            </div>
                            <div className='col-10 p-0 m-0 fs-5'>
                                Login
                            </div>
                        </div>
                    </div>
                }
            </Popover.Body>
        </Popover>
    )

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
        <div className='header row m-0 pe-0' style={ alarmingMode ? headerAlarmingStyle : fireDrillMode ? headerFireDrillStyle : headerStyle }>
            <div className='col-8 p-0 mt-3'>
                <h3 className='proj-name pt-3 ps-5'>FIRE ALARM CONTROL UNIT |</h3>
            </div>
            <div className='col-3 p-0 pt-4 mt-3'>
                <h4 className="build-name">{ buildName }</h4>
            </div>
            <div className='col-1 mt-3'>
                <div className='row h-100'>
                    <OverlayTrigger trigger='click' placement='bottom' overlay={ infoPopover }>
                        <div className='col p-0' style={ iconContainerStyle }>
                            <FontAwesomeIcon className="" icon={ faInfoCircle } style={ iconStyle } />
                        </div>
                    </OverlayTrigger>

                    <OverlayTrigger trigger='click' placement='bottom' overlay={ cogPopover }>
                        <div className='col p-0' style={ iconContainerStyle }>
                            <FontAwesomeIcon className="" icon={ faCog } style={ iconStyle } />
                        </div>
                    </OverlayTrigger>
                </div>
            </div>
            <EstablishFireOutModal 
                show={ showEstablishFireOutModal } 
                setShow={ setShowEstablishFireOutModal }
            />
            <EnableFireDrillModal
                show={ showEnableFireDrillModal }
                setShow={ setShowEnableFireDrillModal } 
            />
            <DisableFireDrillModal 
                show={ showDisableFireDrillModal }
                setShow={ setShowDisableFireDrillModal }
            />
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

const headerFireDrillStyle = {
    backgroundColor: "blue",
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

const linkStyle = {
    textDecoration: "none",
    color: "black"
}

const settingsIconStyle = {
    height: "20px",
    width: "20px"
}

export default Header;
