import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetectorLog from "./components/DetectorLog";
import MapView from "./components/MapView";
import PrivateRouteHelper from "./routes/PrivateRouteHelper";
import NoMatch from "./pages/NoMatch";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EditMapView from "./components/EditMapView";
import UserService from "./services/UserService";
import { useInterval } from "./services/UseInterval";
import { useState } from "react";
import axios from "axios";

function App() {
  const [alarmingStatus, setAlarmingStatus] = useState();

  useInterval(async () => {
    UserService.updateToken();
  }, 300000);

  const getAlarmingModeStatus = () => {
    axios
      .get(global.config.server.url + "/alarming")
      .then((response) => {
        setAlarmingStatus(response.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useInterval(() => {
    getAlarmingModeStatus();
  }, 1000);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MapView />} />
          <Route path="/logs" element={<DetectorLog />} />
          <Route
            path="/edit-map"
            element={
              <PrivateRouteHelper status={alarmingStatus}>
                <EditMapView />
              </PrivateRouteHelper>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
