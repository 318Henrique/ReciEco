import React, { useEffect, useState, useContext } from 'react';
import Header from '../Components/Header';
import Api from '../Api/api';
import Message from '../Components/Message';
import { AuthContext } from '../Context/Auth';

export default function Profile(){
    const [ dataProfile, handleDataProfile ] = useState({});
    const [ message, newMessage ] = useState(null);
    const { userDetail: { dataUser } } = useContext(AuthContext);

    useEffect(() => {
        (async () => {
            try {
                const response = await Api.get('/profile/i/');
                const { content } = response.data;

                handleDataProfile(content[0])
            } catch (error) {
                newMessage({ content: error })
            }
        })()
    }, [])

    return(
        <>
        <Header/>
        <div className='control-main'>
            <div className='control-box-profile'>
                <section className='fpigpfirst'>
                    <div className="foto-profile">
                        <img src={'https://avatars2.githubusercontent.com/u/61211576?s=460&u=c6735688882014b6d93bda918f892b94b79bdc1a&v=4'} alt='Foto do perfil'/>
                    </div>
                    <div className='igp'>
                        <span className='igp-name'>{dataUser.name}</span>
                        <span>{dataProfile.mail}</span>
                    </div>
                </section>
                <div>
                    <section className='btn-of-moviment-between-sections'>
                        <div className='circle'/>
                        <h2 className='title-section'>Informações pessoais</h2>
                    </section>

                    <section className='btn-of-moviment-between-sections'>
                        <div className='circle'/>
                        <h2 className='title-section'>Meus Resíduos</h2>
                    </section>

                </div>
                <div>
                    <section>
                    </section>
                </div>
            </div>
        </div>
        <Message message={message}/>
        </>
    )
}