import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faWrench, faBell, faFileAlt as faFileAltSol, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faFileAlt as faFileAltReg } from '@fortawesome/free-regular-svg-icons'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import UserService from "../../services/UserService"
import { useState } from 'react'
import EnableFireDrillModal from "../Header/EnableFireDrillModal"
import DisableFireDrillModal from "../Header/DisableFireDrillModal"

const Header = ({fireDrillMode}) => {
    const buildName = "Test Building"
    const [showEnableFireDrillModal, setShowEnableFireDrillModal] = useState(false)
    const [showDisableFireDrillModal, setShowDisableFireDrillModal] = useState(false)

    const cogPopover = (
        <Popover className='w-100' style={{ width: "170px"}}>
            <Popover.Body className='p-0 w-100'>
                { UserService.isLoggedIn() ?
                    <>
                        <Link to="/" style={ linkStyle }>
                            <div className='card rounded-0 w-100' style={{cursor: "pointer"}}>
                                <div className='card-body row p-0 m-0'> 
                                    <div className='col-2 p-0 ps-1 m-0 mt-1'>
                                        <FontAwesomeIcon icon={ faHome } style={ settingsIconStyle } />
                                    </div>
                                    <div className='col-10 p-0 m-0 fs-5'>
                                        Home
                                    </div>
                                </div>
                            </div>
                        </Link>
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
                        <Link to="/post-fire-logs" style={ linkStyle }>
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
                        </Link>
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

    return (
        <div className='header row m-0 pe-0' style={ fireDrillMode ? headerFireDrillStyle : headerStyle }>
            <div className='col-8 p-0 mt-3'>
                <h3 className='proj-name pt-3 ps-5'>FIRE ALARM CONTROL UNIT |</h3>
            </div>
            <div className='col-3 p-0 pt-4 mt-3'>
                <h4 className="build-name">{ buildName }</h4>
            </div>
            <div className='col-1 mt-3'>
                <div className='row h-100'>
                    <OverlayTrigger trigger='click' placement='bottom' overlay={ cogPopover }>
                        <div className='d-flex justify-content-center' style={ iconContainerStyle }>
                            <FontAwesomeIcon className="" icon={ faCog } style={ iconStyle } />
                        </div>
                    </OverlayTrigger>
                </div>
            </div>
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
