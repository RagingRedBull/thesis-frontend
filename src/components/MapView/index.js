import SideNav from '../SideNav'
import Map from '../Map'
import Header from '../Header'
import { useEffect, useState } from 'react';

const MapView = () => {
    const [floors, setFloors] = useState([])
    const [currentFloor, setCurrentFloor] = useState([])

    // Get floors
    useEffect(() => {
        const getFloors = async () => {
            const response = await fetch("http://192.168.67.128:8080/prmts/floors")
            var data = await response.json()
            data = data._embedded.floors
            
            setFloors(data)
        }

        getFloors()
    }, [])

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
                    <Map image={ currentFloor.imageName } />
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
