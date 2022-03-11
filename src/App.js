import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapView from "./components/MapView";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
