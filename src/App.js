import "./App.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import UserService from "./services/UserService";
import DetectorLog from './components/DetectorLog';
import MapView from './components/MapView';
import Login from './components/Login';
import ChangePassword from './components/ChangePassword';
import EditMapView from './components/EditMapView';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar bg="light">
          <Container>
            <Navbar.Brand>PRMTS</Navbar.Brand>
            <Nav className="me-auto">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/detector" className="nav-link">
                Detectors
              </Link>
              <Link to="/logs" className="nav-link">
                Logs
              </Link>
              <Link to="/floor" className="nav-link">
                Floors
              </Link>
              <Link to="/edit-map" className="nav-link">
                Edit Map
              </Link>
            </Nav>
            <Nav>
              <div className="container">
                {!UserService.isLoggedIn() ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => UserService.doLogin()}
                  >
                    Login
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => UserService.doLogout()}
                  >
                    Logout
                  </button>
                )}
              </div>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<MapView />} />
          <Route path="/logs" element={<DetectorLog />} />
          <Route path="/detector" element={<Detector />} />
          <Route path="/floor" element={<Floors />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/edit-map" element={<EditMapView />} />
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
