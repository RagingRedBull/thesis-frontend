import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faInfoCircle, faWrench, faBell, faFileAlt as faFileAltSol, faAsterisk, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faFileAlt as faFileAltReg } from '@fortawesome/free-regular-svg-icons'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import UserService from "../../services/UserService"

const index = () => {
    const buildName = "Test Building"

    const cogPopover = (
        <Popover className='' style={{ width: "170px"}}>
            <Popover.Body className='p-0'>
                { UserService.isLoggedIn() ?
                    <>
                        <div className='card rounded-0' style={{cursor: "pointer"}}>
                            <div className='card-body row p-0 m-0'> 
                                <div className='col-2 p-0 ps-1 m-0'>
                                    <FontAwesomeIcon icon={ faWrench } />
                                </div>
                                <div className='col-10 p-0 m-0'>
                                    Maintenance Mode
                                </div>
                            </div>
                        </div>
                        <div className='card rounded-0' style={{cursor: "pointer"}}>
                            <div className='card-body row p-0 m-0'> 
                                <div className='col-2 p-0 ps-1 m-0'>
                                    <FontAwesomeIcon icon={ faBell } />
                                </div>
                                <div className='col-10 p-0 m-0'>
                                    Fire Drill mode
                                </div>
                            </div>
                        </div>
                        <div className='card rounded-0' style={{cursor: "pointer"}}>
                            <div className='card-body row p-0 m-0'> 
                                <div className='col-2 p-0 ps-1 m-0'>
                                    <FontAwesomeIcon icon={ faFileAltReg } />
                                </div>
                                <div className='col-10 p-0 m-0'>
                                    Status reports
                                </div>
                            </div>
                        </div>
                        <div className='card rounded-0' style={{cursor: "pointer"}}>
                            <div className='card-body row p-0 m-0'> 
                                <div className='col-2 p-0 ps-1 m-0'>
                                    <FontAwesomeIcon icon={ faFileAltSol } />
                                </div>
                                <div className='col-10 p-0 m-0'>
                                    Post-fire reports
                                </div>
                            </div>
                        </div>
                        <Link to="/change-password" style={ linkStyle }>
                            <div className='card rounded-0' style={{cursor: "pointer"}}>
                                <div className='card-body row p-0 m-0'> 
                                    <div className='col-2 p-0 ps-1 m-0'>
                                        <FontAwesomeIcon icon={ faAsterisk } />
                                    </div>
                                    <div className='col-10 p-0 m-0'>
                                        Reset Password
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </>
                    :
                    <div className='card rounded-0' style={{cursor: "pointer"}} onClick={() => UserService.doLogin()}>
                        <div className='card-body row p-0 m-0'> 
                            <div className='col-2 p-0 ps-1 m-0'>
                                <FontAwesomeIcon icon={ faSignInAlt } />
                            </div>
                            <div className='col-10 p-0 m-0'>
                                Login
                            </div>
                        </div>
                    </div>
                }
            </Popover.Body>
        </Popover>
    )

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
                        <FontAwesomeIcon className="" icon={ faInfoCircle } style={ iconStyle } />
                    </div>
                    <OverlayTrigger trigger='click' placement='bottom' overlay={ cogPopover }>
                        <div className='col p-0' style={ iconContainerStyle }>
                            <FontAwesomeIcon className="" icon={ faCog } style={ iconStyle } />
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

export default index;
