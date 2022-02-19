import UserService from "../services/UserService";
import RestrictedAccess from "../pages/RestrictedAccess";
const PrivateRouteHelper = ({ children }) => {

 const isLoggedIn = UserService.isLoggedIn();

 return isLoggedIn ? children : <RestrictedAccess/>;
};

export default PrivateRouteHelper;