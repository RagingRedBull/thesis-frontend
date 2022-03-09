import UserService from "../services/UserService";
import RestrictedAccess from "../pages/RestrictedAccess";
const PrivateRouteHelper = ({ children, status }) => {

 const isLoggedIn = UserService.isLoggedIn();

 return isLoggedIn ? status ? <RestrictedAccess /> : children : <RestrictedAccess/>;
};

export default PrivateRouteHelper;