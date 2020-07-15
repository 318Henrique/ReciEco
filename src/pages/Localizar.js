import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Header from '../Components/Header';
import '../styles/style.css';
import iconMap from '../assets/icon-map.svg';

export default function Localizar(){
    const [location] = useState({
        center:{
            lat: -13.652983515155118,
            lng: -59.80454723773811,
        }
    })
    const [key] = useState('AIzaSyCKb5RlQfAw2DiQb_Gq0rIwCsiJv8P1bsQ');
    const [zoom] = useState(15);

    return(
        <>
        <Header/>
        <LoadScript googleMapsApiKey={key}>
            <GoogleMap
                mapContainerClassName="map"
                center={location.center}
                zoom={zoom}
            >
                <Marker position={location.center} icon={iconMap}/>
            </GoogleMap>
        </LoadScript>
        </>
    )
}