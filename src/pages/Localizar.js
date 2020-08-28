import React, { useState, useContext, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Header from '../Components/Header';
import '../styles/style.css';
import iconMap from '../assets/icon-map.png';
import { AuthContext } from '../Context/Auth';
import Message from '../Components/Message';

export default function Localizar(){
    const { userDetail: { dataUser } } = useContext(AuthContext);
    const [ messagePage, newMessage ] = useState(null);
    const [location, handleLocation] = useState({
        lat: dataUser.coords.coord_lat,
        lng: dataUser.coords.coord_lng,
    })
    const [key] = useState('AIzaSyCKb5RlQfAw2DiQb_Gq0rIwCsiJv8P1bsQ');
    const [zoom] = useState(15);

    useEffect(() => {
        const geolocationSuccess = ({ coords }) => {
            handleLocation({
                lat: coords.latitude,
                lng: coords.longitude
            })
        }

        const geolocationError = ({ message }) => {
            if(message === 'User denied Geolocation') return newMessage({ content: "Precisamos que você habilite o acesso a sua localização!" })
            else return newMessage({ content: message })
        }

        const geolocationOptions = {
            enableHighAccuracy: true,
            timeout: 1000,
            maximumAge: 1000,
        }

        navigator.geolocation.watchPosition(geolocationSuccess, geolocationError, geolocationOptions)
        
    }, [])

    return(
        <>
        <Header/>
        <LoadScript googleMapsApiKey={key}>
            <GoogleMap
                mapContainerClassName="map"
                center={location}
                zoom={zoom}
            >
                <Marker position={location} icon={iconMap}/>
            </GoogleMap>
        </LoadScript>
        <Message message={messagePage}/>
        </>
    )
}