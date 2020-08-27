import React, { useState, useContext } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Header from '../Components/Header';
import '../styles/style.css';
import iconMap from '../assets/icon-map.svg';
import { AuthContext } from '../Context/Auth';

export default function Localizar(){
    const { userDetail: { dataUser } } = useContext(AuthContext);
    const [location] = useState({
        lat: dataUser.coords.coord_lat,
        lng: dataUser.coords.coord_lng,
    })
    const [key] = useState('AIzaSyCKb5RlQfAw2DiQb_Gq0rIwCsiJv8P1bsQ');
    const [zoom] = useState(15);

    return(
        <>
        <Header/>
        <LoadScript googleMapsApiKey={key}>
            <GoogleMap
                mapContainerClassName="map"
                center={location}
                zoom={zoom}
            >
                <Marker position={location.center} icon={iconMap}/>
            </GoogleMap>
        </LoadScript>
        </>
    )
}