import "../../css/EditMapView.css"
import { useEffect, useState } from "react"
import axios from "axios"
import SideNav from "./SideNav"
import Map from "./Map"
import Header from "../Header"


const EditMapView = () => {
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

    const handleDelete = async (id) => {
        const response = await axios.delete(global.config.server.url + "/floor/" + id + "/delete")

        if (response.status === 200) {
            setFloors(floors.filter((floor) => floor.id !== id))
        } else {
            alert("Error failed to delete floor")
        }
    }

    return (
        <div className="container-fluid edit-map-containter row m-0 p-0">
            <div className="side-navigation col-1 p-0 text-center">
                <SideNav floors={ floors } setCurrentFloor={ setCurrentFloor } currentFloor={ currentFloor } setFloors={ setFloors } handleDelete={ handleDelete } />
            </div>
            <div className="col-11 p-0 m-0 row g-0">
                <Header />
                <Map image={ currentFloor.imageUrl } hasFloors={ floors.length > 0 } floorId={ currentFloor.id } currentFloor={ currentFloor } />
            </div>
        </div>
    )
}

export default EditMapView