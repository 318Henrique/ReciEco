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
    console.log(dataProfile)

    return(
        <>
        <Header/>
        <div className='control-main'>
            <div className='control-box-profile'>
                <div>
                    <img src={dataUser} alt='Foto do perfil'/>
                </div>
                <div>
                    <div className='btn-of-moviment-between-sections'>
                        <div className='circle'/>
                        <span className='title-section'>Informações pessoais</span>
                    </div>

                    <div className='btn-of-moviment-between-sections'>
                        <div className='circle'/>
                        <span className='title-section'>Meus Resíduos</span>
                    </div>

                    <div className='btn-of-moviment-between-sections'>
                        <div className='circle'/>
                        <span className='title-section'>Informações de acesso</span>
                    </div>
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