import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetectorLog from "./components/DetectorLog";
import ChangePassword from "./components/ChangePassword";
import MapView from "./components/MapView";
import PrivateRouteHelper from "./routes/PrivateRouteHelper";
import NoMatch from "./pages/NoMatch";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import EditMapView from "./components/EditMapView";
import AddFloor from "./components/EditMapView/AddFloor";
import UserService from "./services/UserService";
import { useInterval } from "./services/UseInterval";

function App() {
  useInterval(async () => {
    UserService.updateToken();
  }, 300000);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MapView />} />
          <Route path="/logs" element={<DetectorLog />} />
          <Route path="/detector" element={<Detector />} />
          <Route path="/floor" element={<Floors />} />
          <Route
            path="/add-floor"
            element={
              <PrivateRouteHelper>
                <AddFloor />
              </PrivateRouteHelper>
            }
          />
          <Route
            path="/change-password"
            element={
              <PrivateRouteHelper>
                <ChangePassword />
              </PrivateRouteHelper>
            }
          />
          <Route
            path="/edit-map"
            element={
              <PrivateRouteHelper>
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

function Detector() {
  return <h3>Detector</h3>;
}
function Floors() {
  return <h3>Floors</h3>;
}

export default App;
