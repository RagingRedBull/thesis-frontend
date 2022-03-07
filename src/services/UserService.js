import Keycloak from "keycloak-js";
//Customhook for user and keycloak interaction
const _kc = new Keycloak("/keycloak.json");

const initKeycloak = (onAuthenticatedCallback) => {
  _kc
    .init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri:
        window.location.origin + "/silent-check-sso.html",
      pkceMethod: "S256",
    })
    .then((authenticated) => {
      if (!authenticated) {
        console.log("user is not authenticated..!");
      }
      onAuthenticatedCallback();
    })
    .catch(console.error);
};

const doLogin = _kc.login;

const doLogout = () => {
  _kc.logout({ redirectUri: 'http://localhost:3000/' });
};

const getToken = () => _kc.token;

const isLoggedIn = () => {
  return !!_kc.token;
};

const updateToken = (successCallback) =>
  _kc.updateToken(500).then(successCallback).catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const updateToken2 = () =>
  _kc
    .updateToken(1)
    .then(() => {
      console.log("UPDATES THE TOKEN");
    })
    .catch(doLogin);

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  updateToken2,
  getUsername,
  hasRole,
};

export default UserService;
