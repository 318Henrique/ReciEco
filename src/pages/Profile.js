import React, { useEffect, useState, useContext, useCallback } from 'react';
import Header from '../Components/Header';
import Api from '../Api/api';
import Message from '../Components/Message';
import { AuthContext } from '../Context/Auth';

export default function Profile(){
    const [ dataProfile, handleDataProfile ] = useState({});
    const [ residuesProfile, handleResiduesProfile ] = useState([]);
    const [ message, newMessage ] = useState(null);
    const { userDetail: { dataUser } } = useContext(AuthContext);
    const [ loading, handleLoading ] = useState(false);

    const getDataPersonaProfile = useCallback(() => {
        (async () => {
            handleLoading(true)
            try {
                const response = await Api.get('/profile/i/');
                const { content } = response.data;

                handleDataProfile(content[0])
            } catch (error) {
                newMessage({ content: error })
            }

            handleLoading(false)
        })()
    }, [])

    const getResidueesPersonProfile = useCallback(() => {
        (async () => {
            try {
                const response = await Api.get('/profile/residues/');
                const { content } = response.data;

                handleResiduesProfile(content)
            } catch (error) {
                newMessage({ content: error })
            }
        })()
    }, [])

    useEffect(() => {
        getDataPersonaProfile();
        getResidueesPersonProfile();

    }, [getDataPersonaProfile, getResidueesPersonProfile])

    const whatDocument = (document) => {
        if(document === undefined) return;
        return document.length === 11 ? `CPF ${document}` : `CNPJ ${document}`;
    }

    return(
        <>
        <Header/>
        <div className='control-main'>
            <section className='fpigpfirst'>
                <div className="foto-profile">
                    <img src={dataProfile.foto || require('../assets/icon-person.svg')} alt='Foto do perfil'/>
                </div>
                <div className='igp'>{ dataUser.name }</div>
                <div className={`document ${loading ? 'loading-field' : ''}`}>{ whatDocument(dataProfile.document) }</div>
            </section>
            <section className='section-contact'>
                <div className='section-contact-title'>
                    <h2 className='title-section'>Contato</h2>
                </div>
                <div className='section-contact-content'>
                    <div>
                        <span className={`${loading ? 'loading-field' : ''}`}>{dataProfile.mail}</span>
                        <span className={`${loading ? 'loading-field' : ''}`}><a href={`https://api.whatsapp.com/send?phone=${dataProfile.whatsapp}&text=Ola`} target="_blank" rel="noopener noreferrer">{dataProfile.whatsapp}</a></span>
                    </div>
                </div>
            </section>
            <section className='section-address'>
                <h2 className='title-section'>Endereço</h2>
                <div className='content'>
                    <span className={`${loading ? 'loading-field' : ''}`}>{loading ? '' : `${dataProfile.address} - ${dataProfile.address_number}, ${dataProfile.neghborhood}`}</span>
                    <span className={`${loading ? 'loading-field' : ''}`}>{loading ? '' : `${dataProfile.city} - ${dataProfile.state}`}</span>
                    <span className={`${loading ? 'loading-field' : ''}`}>{loading ? '' : `Latitude ${dataProfile.coord_lat}, Longitude ${dataProfile.coord_lng}`}</span>
                </div>
            </section>

            <section className='section-residues'>
                <h2 className='title-section'>Meus Resíduos</h2>
                <div className='choise-rediues'>
                    {
                        !residuesProfile.length ? <div className="choise-residues-item loading-residues"/>
                        :
                        residuesProfile.map(({ residues_id, residues_name, icon }) => (
                            <div
                                key={ residues_id }
                                className="choise-residues-item"
                            >
                                <img src={ icon } alt=''/>
                                <span> { residues_name } </span>
                            </div>
                        ))
                    }
                </div>
            </section>
        </div>
        <Message message={message}/>
        </>
    )
}