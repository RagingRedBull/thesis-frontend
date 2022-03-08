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
      console.log("TOKEN ", _kc.token);
      console.log(_kc);
      onAuthenticatedCallback();
    })
    .catch(console.error);
};

const doLogin = _kc.login;

const doLogout = () => {
  _kc.logout({ redirectUri: "http://localhost:3000/" });
};

const getToken = () => _kc.token;

const isLoggedIn = () => {
  return !!_kc.token;
};

const updateToken = () => {
  _kc
    .updateToken(10)
    .then(function (refreshed) {
      if (!!refreshed) {
        console.log("Token was successfully refreshed");
      } else {
        console.log("Token is still valid");
      }
    })
    .catch(function () {
      console.log("Failed to refresh the token, or the session has expired");
    });
};

const onTokenExpired = () => {
  _kc.onTokenExpired = () => {
    _kc
      .updateToken(300)
      .then(function (refreshed) {
        if (!!refreshed) {
          console.log("Token was successfully refreshed");
        } else {
          console.log("Token is still valid");
        }
      })
      .catch(function () {
        console.log("Failed to refresh the token, or the session has expired");
      });
  };
};

const isTokenExpired = (min) => {
  return !!_kc.isTokenExpired(min);
};

const getUsername = () => _kc.tokenParsed?.preferred_username;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  onTokenExpired,
  isTokenExpired,
  updateToken,
  getUsername,
  hasRole,
};

export default UserService;
