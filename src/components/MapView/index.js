import SideNav from "../SideNav"
import Map from "../Map"
import Header from "../Header"
import { useEffect, useState } from "react"
import axios from "axios"
import  '../../constants/constants.js'
import '../../css/MapView.css'

const MapView = ({alarmingMode, fireDrillMode}) => {
  const [floors, setFloors] = useState([])
  const [currentFloor, setCurrentFloor] = useState([])

  // Get floors
  useEffect(() => {
    const getFloors = async () => {
      axios
        .get(global.config.server.url + "/floor/all", {
          params: {
            pageNumber: 0,
            pageSize: 10
          }
        })
        .then((response) => {
          setFloors(response.data.content)
          
          if (response.data.content.length > 0) {
            setCurrentFloor(response.data.content[0])
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getFloors()
  }, [])

  return (
    <div className="container-fluid row p-0 m-0" style={ mapViewStyle }>
      <div className="col-1 p-0 text-center"  style={ sideNavStyle }>
        <SideNav floors={ floors } setCurrentFloor={ setCurrentFloor } selFloorId={ currentFloor.id } />
      </div>
      <div className="h-100 col-11 p-0 m-0 row g-0">
        <Header alarmingMode={ alarmingMode } fireDrillMode={ fireDrillMode } />
        <Map 
          image={ currentFloor.imageUrl } 
          hasFloors={ floors.length > 0 } 
          floorId={ currentFloor.id } 
          alarmingMode={ alarmingMode }
          floorOrder={ currentFloor.order }
        />
      </div>
    </div>
  )
}

const mapViewStyle = {
  backgroundColor: "grey",
  height: "100%",
  minHeight: "100vh"
}

const sideNavStyle = {
  backgroundColor: '#FB3640',
}

export default MapView;
