import "../../css/EditMapView.css"
import { useEffect, useState } from "react"
import axios from "axios"
import SideNav from "./SideNav"
import Map from "./Map"
import Header from "./Header"
import UserService from "../../services/UserService"

const EditMapView = () => {
    const [floors, setFloors] = useState([])
    const [currentFloor, setCurrentFloor] = useState([])

    // Get floors
    useEffect(() => {
        getFloors()
    }, [])

    const handleDeleteFloor = async (id) => {
        const response = await axios.delete(global.config.server.url + "/floor/" + id + "/delete", {
            headers: {
                Authorization: `Bearer ${UserService.getToken()}`
            }
        })

        if (response.status === 200) {
            setFloors(floors.filter((floor) => floor.id !== id))
        } else {
            alert("Error failed to delete floor")
        }
    }

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

    const handleUpdateFloor = async (updFloor) => {
        const response = await axios.put(global.config.server.url + "/floor/update", {
            id: updFloor.id,
            name: updFloor.name,
            description: updFloor.description,
            imageUrl: updFloor.imageUrl,
            order: updFloor.order
        },
        {
            headers: {
                Authorization: `Bearer ${UserService.getToken()}`
            }
        })

        if (response.status === 200) {
            getFloors()
        }
    }

    return (
        <div className="container-fluid edit-map-containter row m-0 p-0">
            <div className="side-navigation col-1 p-0 text-center">
                <SideNav floors={ floors } setCurrentFloor={ setCurrentFloor } currentFloor={ currentFloor } setFloors={ setFloors } handleDelete={ handleDeleteFloor } handleUpdate={ handleUpdateFloor } />
            </div>
            <div className="col-11 p-0 m-0 row g-0">
                <Header />
                <Map image={ currentFloor.imageUrl } hasFloors={ floors.length > 0 } floorId={ currentFloor.id } currentFloor={ currentFloor } />
            </div>
        </div>
    )
}

export default EditMapView
