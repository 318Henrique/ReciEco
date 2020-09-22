import React, { useState, useContext, useEffect, useCallback, useRef } from 'react';
import MapMain, { Marker,  } from 'react-map-gl';
import Header from '../Components/Header';
import '../styles/style.css';
import { AuthContext } from '../Context/Auth';
import Message from '../Components/Message';
import Api from '../Api/api';
import iconSearch from '../assets/icon-search.png';
import ModalPersonSelectedMap from '../Components/ModalPersonSelectedMap';

export default function Localizar(){
    const { userDetail: { dataUser } } = useContext(AuthContext);
    const boxSearchRef = useRef();
    const [ search, handleSearch ] = useState('');
    const [ submitSearch, handleSubmitSearch ] = useState(true);
    const [ messagePage, newMessage ] = useState(null);
    const [viewport, handleViewport] = useState({
        latitude: -12.211501,
        longitude: -55.571655,
        zoom: 6,
    })
    const [ listPeoples, handleListPeoples ] = useState([]);
    const [currentPosition, handleCurrentPosition] = useState({
        latitude: dataUser.coords.coord_lat,
        longitude: dataUser.coords.coord_lng,
    })
    const [ showPerson, handleShowPerson ] = useState(null);

    useEffect(() => {
        const geolocationSuccess = ({ coords }) => {
            handleCurrentPosition({
                latitude: coords.latitude,
                longitude: coords.longitude
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

    const getPeoples = useCallback(() => {
        async function getList(){
            try {
                const response = await Api.get(`/map/list/peoples/?query=${search}`);
                const { content } = response.data;
                
                if(!content.length) return newMessage({ content: 'Nenhuma resultado!' })

                handleListPeoples(content);

            } catch (error) { newMessage({ content: error })}

            handleSubmitSearch(false);
        }

        if(submitSearch || search === '') return getList();
    }, [search, submitSearch])

    useEffect(() => {
        getPeoples()
    }, [getPeoples]);

    function captureKeyEnter({ key }) { if(key === 'Enter') handleSubmitSearch(true);}

    function personClicked(data){
        handleShowPerson(data);
        handleViewport(oldData => Object.assign(oldData, {
            latitude: data.coord_lat,
            longitude: data.coord_lng,
            zoom: 15
        }))
    }

    useEffect(() =>{
        function removeEvent(e){
            if(e.key === "Escape") {
                handleShowPerson(null);
                window.removeEventListener('keydown', () => {})
            }
        }

        if(showPerson !== null) window.addEventListener('keydown', removeEvent)
    }, [showPerson])

    return(
        <>
        <Header/>
        <div className='filter-search filter-search-map'>
          <div className='inputSearch' ref={boxSearchRef}>
            <button>
              <img src={iconSearch} alt=''/>
            </button>
            <input
              type='search'
              name='search'
              value={ search }
              placeholder="Ex: Luiz, Colniza..."
              onChange={({ target }) => handleSearch(target.value) }
              onKeyPress={event => captureKeyEnter(event)}
              onFocus={() => boxSearchRef.current.classList.add('inputSearchActived')}
              onBlur={() => boxSearchRef.current.classList.remove('inputSearchActived')}
            />
          </div>
          <div className="btns-filter-map-search">
              <button>Geradores</button>
              <button>Compradores</button>
              <button>Catadores</button>
          </div>
        </div>
        <div className='control-main control-main-map'>
            <MapMain
                {...viewport}
                width="100vw"
                height="100vh"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN_ACCESS}
                mapStyle="mapbox://styles/solucaocriativaoficial/ckfcy4i9j5tk519tb9u7yxetv"
                onViewportChange={(viewport) => {
                    handleShowPerson(null)
                    handleViewport(viewport)
                }}
                >
                    {
                        currentPosition.latitude === null ? <></> : 
                        <Marker latitude={currentPosition.latitude} longitude={currentPosition.longitude}>
                            <div className='overlay-view-my-position'/>
                        </Marker>
                    }
                    {
                        listPeoples.map(person => (
                            <Marker
                                key={person.id}
                                className={`marker${person.id}`}
                                latitude={ person.coord_lat }
                                longitude={ person.coord_lng }
                            >
                                <div className='perfil-map' onClick={() => personClicked(person)}>
                                    <img src={ person.foto } alt=''/>
                                </div>
                            </Marker>
                        ))
                    }
            </MapMain>
        </div>
        <ModalPersonSelectedMap person={showPerson}/>
        <Message message={messagePage}/>
        </>
    )
}