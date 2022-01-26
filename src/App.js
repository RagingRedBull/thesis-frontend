import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import DetectorLog from './components/DetectorLog';
import MapView from './components/MapView';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto ">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/detector" className="nav-link">Detectors</Link>
              </li>
              <li>
                <Link to="/logs" className="nav-link">Logs</Link>
              </li>
              <li className="nav-item">
                <Link to="/floor" className="nav-link">Floors</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<MapView />}/>
          <Route path="/logs" element={<DetectorLog />}/>
          <Route path="/detector" element={<Detector/>}/>
          <Route path="/floor" element={<Floors />}/>
        </Routes>
      </div>
    </Router>

  );
}

function Detector() {
  return <h3>Detector</h3>
}
function Floors() {
  return <h3>Floors</h3>
}
export default App;
