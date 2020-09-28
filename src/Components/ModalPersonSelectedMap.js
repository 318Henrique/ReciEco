import React, { useCallback, useEffect, useState } from 'react';
import iconClose from '../assets/icon-close.png';
import Api from '../Api/api';
import Message from './Message';
import iconWhatsapp from '../assets/icon-whatsapp.png';

export default function ModalPersonSelectedMap({ person, closeModal = () => {}, admin = false }){
    const [ residuesProfile, handleResiduesProfile ] = useState([]);
    const [ message, newMessage ] = useState(null);
    const [ loadingResidues, handleLoadingResidues ] = useState(true);

    const getResidueesPersonProfile = useCallback(() => {
        (async () => {
            try {
                const response = await Api.get(`/residues/person/${person.id}`);
                const { content } = response.data;

                handleResiduesProfile(content)
            } catch (error) {
                newMessage({ content: error })
            }

            handleLoadingResidues(false)
        })()
    }, [person.id])

    useEffect(() => {
        getResidueesPersonProfile();
    }, [getResidueesPersonProfile])

    return(
        <div className="modal-marker">
            <div className="marker-actived">
                <button className='close-modal' onClick={() => closeModal()}>
                    <img src={iconClose} alt="x"/>
                </button>
                <div className='perfil-map'>
                    <img src={ person.foto } alt=''/>
                    <div className="black-shadow-name">
                        <span className="information-person-map-personName">{person.person_name}</span>
                    </div>
                </div>
                <section className="information-person-map">
                    <div className="contact-address">
                        <span>{person.mail}</span>
                        {
                            !admin ? <></> : <span>{person.document}</span>
                        }
                        <span style={{
                            height: 'auto',
                            padding: '2px 0',
                        }}>
                            <a
                                about="Link do Whatsapp"
                                title={`Falar com ${person.person_name} pelo whatsapp!`}
                                href={`https://api.whatsapp.com/send?phone=${person.whatsapp}&text=Oi,%20estou%20vindo%20do%20recieco,%20e%20gostaria%20de%20falar%20com%20voc%C3%AA`} target="_blank" rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <img src={iconWhatsapp} alt="" style={{ width: 20, height: 20, marginRight: 5 }}/> {person.whatsapp}
                            </a>
                        </span>
                        <span>{person.address}, {person.address_number} - {person.neghborhood}</span>
                        <span>Cidade de {person.city} - { person.state }</span>
                    </div>
                    <div className="type-person-control">
                        <span>Tipo de pessoa</span>
                        <div className="type-person">
                            {
                                person.type_person === null ? <></> : 
                                person.type_person.split(',').map(type => <div key={type} className={type}>{type}</div>)
                            }
                        </div>
                    </div>
                    <section className='section-residues'>
                <h2 className='title-section'>Meus Resíduos</h2>
                <div className='choise-rediues'>
                    {
                        loadingResidues ? <div className="choise-residues-item loading-residues"/>
                        :
                        !residuesProfile.length ? <h3>Nenhum resíduo encontrado dessa pessoa</h3> :
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
                </section>
            </div>
            <Message message={message} />
        </div>
    )
}