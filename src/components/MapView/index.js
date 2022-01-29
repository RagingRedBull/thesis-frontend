import SideNav from "../SideNav"
import Map from "../Map"
import Header from "../Header"
import { useEffect, useState } from "react"
import axios from "axios"
import  '../../constants/constants.js'
import '../../css/MapView.css'

const MapView = () => {
  const [floors, setFloors] = useState([])
  const [currentFloor, setCurrentFloor] = useState([])

  // Get floors
  useEffect(() => {
    const getFloors = async () => {
      axios
        .get(global.config.server.url + "/floors")
        .then((response) => {
          setFloors(response.data._embedded.floors);
          setCurrentFloor(response.data._embedded.floors[0])
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getFloors()
  }, [])

  return (
    <div className="container-fluid row p-0 m-0" style={mapViewStyle}>
      <div className="col-1 p-0 text-center"  style={ sideNavStyle }>
        <SideNav floors={ floors } setCurrentFloor={ setCurrentFloor } selFloorName={ currentFloor.name } />
      </div>
      <div className="col-11 p-0">
        <Header />
        <Map image={ currentFloor.imageName } hasFloors={ floors.length > 0 } />
      </div>
    </div>
  )
}

// To be replaced with Tailwind
const mapViewStyle = {
  backgroundColor: "grey",
  height: "100vh"
}

const sideNavStyle = {
  backgroundColor: '#FB3640',
}

export default MapView;
