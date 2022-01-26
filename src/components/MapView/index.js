import SideNav from '../SideNav'
import Map from '../Map'
import Header from '../Header'
import { useEffect, useState } from 'react';

const MapView = () => {
    // const [floors, setFloors] = useState([])
    const [currentFloor, setCurrentFloor] = useState([])

    //Temporary Floors
    const floors = [
        {
            id: 0,
            desc: "G",
            image: "ae960107-025d-4fda-a899-a98ce8f7c15b_test-floor-plan.jpg"
        },
        {
            id: 1,
            desc: "M",
            image: "ae960107-025d-4fda-a899-a98ce8f7c15b_test-floor-plan.jpg"
        },
        {
            id: 2,
            desc: "1",
            image: "ae960107-025d-4fda-a899-a98ce8f7c15b_test-floor-plan.jpg"
        }
    ]

    // useEffect(() => {
    //     const getFloors = async () => {
    //         const res = await fetch("http://192.168.67.128:8080/prmts/floors")
    //         const data = await res.json()
    //         setFloors(data)
    //     }

    //     getFloors()
    // }, [])

    return (
        <div className='container' style={ mapViewStyle }>
            <div className='row'>
                <div className='col'>
                    <SideNav 
                        floors={ floors }
                        setCurrentFloor={ setCurrentFloor }
                    />
                </div>
                <div className='col-10'>
                    <Header />
                    <Map image={ currentFloor.image } />
                </div>
            </div>
        </div>
    )
};

// To be replaced with Tailwind
const mapViewStyle = {
    height: '720px',
    backgroundColor: 'grey',
    position: 'relative'
}

export default MapView;
