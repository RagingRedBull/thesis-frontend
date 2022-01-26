import SideNav from '../SideNav'
import Map from '../Map'
import Header from '../Header'

const MapView = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <SideNav />
                </div>
                <div className='col-10'>
                    <Header />
                    <Map />
                </div>
            </div>
        </div>
    )
};

export default MapView;
