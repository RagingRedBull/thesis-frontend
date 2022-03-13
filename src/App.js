import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapView from "./components/MapView";
import PrivateRouteHelper from "./routes/PrivateRouteHelper";
import NoMatch from "./pages/NoMatch";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EditMapView from "./components/EditMapView";
import UserService from "./services/UserService";
import { useInterval } from "./services/UseInterval";
import { useState, useEffect } from "react";
import axios from "axios";
import StatusReport from "./components/StatusReport";

function App() {
  const [alarmingMode, setAlarmingMode] = useState(false);
  const [fireDrillMode, setFireDrillMode] = useState(false);

  useEffect(() => {
    getAlarmingModeStatus();
    getFireDrillMode();
  }, []);
  

  useInterval(async () => {
    UserService.updateToken();
  }, 300000);

  const getAlarmingModeStatus = () => {
    axios
      .get(global.config.server.url + "/alarming")
      .then((response) => {
        setAlarmingMode(response.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getFireDrillMode = () => {
    axios.get(
      global.config.server.url + "/fire-drill"
      )
      .then((response) => {
        setFireDrillMode(response.data)
      })
  };

  useInterval(() => {
    getAlarmingModeStatus();
    getFireDrillMode();
  }, 1000);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MapView alarmingMode={ alarmingMode } fireDrillMode={ fireDrillMode }/>} />
          <Route 
            path="/status-logs" 
            element={
              <PrivateRouteHelper status={ alarmingMode }>
                <StatusReport />
              </PrivateRouteHelper>
            } 
          />
          <Route
            path="/edit-map"
            element={
              <PrivateRouteHelper status={ alarmingMode }>
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
