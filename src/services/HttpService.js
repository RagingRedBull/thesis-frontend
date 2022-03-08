import axios from "axios";
import UserService from "./UserService";

const HttpMethods = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
};

const _axios = axios.create();

const configure = () => {
  _axios.interceptors.request.use((config) => {
    if (UserService.isLoggedIn()) {
      const cb = () => {
        config.headers.Authorization = `Bearer ${UserService.getToken()}`;
        return Promise.resolve(config);
      };
      return UserService.updateToken(cb);
    }
  });
};

const getAxiosClient = () => _axios;

// const getAlarmingModeStatus = () => {
//   const mode = false;
//   _axios
//     .get(global.config.server.url + "/alarming")
//     .then((response) => {
//       mode = response.data;
//       return mode;
//     })
//     .catch((err) => {
//       console.log("Error", err);
//     });
// };

const HttpService = {
  HttpMethods,
  configure,
  getAxiosClient,
  // getAlarmingModeStatus,
};

export default HttpService;
