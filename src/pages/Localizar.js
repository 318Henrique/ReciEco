import React, { useState, useContext, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, OverlayView } from '@react-google-maps/api';
import Header from '../Components/Header';
import '../styles/style.css';
import { AuthContext } from '../Context/Auth';
import Message from '../Components/Message';
import Api from '../Api/api';

export default function Localizar(){
    const { userDetail: { dataUser } } = useContext(AuthContext);
    const [ messagePage, newMessage ] = useState(null);
    const [location, handleLocation] = useState({
        lat: dataUser.coord_lat,
        lng: dataUser.coord_lng,
    })
    const [key] = useState('AIzaSyCKb5RlQfAw2DiQb_Gq0rIwCsiJv8P1bsQ');
    const [zoom] = useState(15);
    const [ listPeoples, handleListPeoples ] = useState([]);

    const getPeoples = useCallback(() => {
        async function getList(){
            try {
                const response = await Api.get('/map/list/peoples/');
                const { content } = response.data;
                
                if(!content.length) return newMessage({ content: 'Nenhuma pessoa ou empresa encontrada!' })

                handleListPeoples(content);

            } catch (error) {
                newMessage({ content: error })
            }
        }

        getList()
    },[])

    useEffect(() => getPeoples(), [getPeoples]);

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
            timeout: 10000,
            maximumAge: 1000,
        }

        navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, geolocationOptions)
        
    }, [])

    return(
        <>
        <Header/>
        <div className='control-main control-main-map'>
            <LoadScript googleMapsApiKey={key}>
                <GoogleMap
                    mapContainerClassName="map"
                    center={location}
                    zoom={zoom}
                >
                    <OverlayView position={location} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                        <div className='overlay-view-my-position'/>
                    </OverlayView>
                    {
                        listPeoples.map((item) => {
                            const { id, person_name, coord_lat, coord_lng, foto } = item;
                            const positionPersonCurrent = { lat: parseFloat(coord_lat), lng: parseFloat(coord_lng) };
                            return (
                            <OverlayView key={id} position={positionPersonCurrent} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
                                <div className='overlay-view'>
                                    <div className='perfil-map'>
                                        <img src={foto} alt=''/>
                                    </div>
                                    <span>{ person_name }</span>
                                </div>
                            </OverlayView>
                            )
                    })
                    }
                </GoogleMap>
            </LoadScript>
        </div>
        <Message message={messagePage}/>
        </>
    )
}