import SideNav from "../SideNav";
import Map from "../Map";
import Header from "../Header";
import { useEffect, useState } from "react";
import axios from "axios";
import  '../../constants/constants.js'

const MapView = () => {
  const [floors, setFloors] = useState([]);
  const [currentFloor, setCurrentFloor] = useState([]);

  // Get floors
  useEffect(() => {
    const getFloors = async () => {
      axios
        .get(global.config.server.url + "/floors")
        .then((response) => {
          setFloors(response.data._embedded.floors);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getFloors();
  });

  return (
    <div className="container" style={mapViewStyle}>
      <div className="row">
        <div className="col">
          <SideNav floors={floors} setCurrentFloor={setCurrentFloor} />
        </div>
        <div className="col-10">
          <Header />
          <Map image={currentFloor.imageName} />
        </div>
      </div>
    </div>
  );
};

// To be replaced with Tailwind
const mapViewStyle = {
  height: "720px",
  backgroundColor: "grey",
  position: "relative",
};

export default MapView;
