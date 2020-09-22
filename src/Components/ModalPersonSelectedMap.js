import React from 'react';
import iconClose from '../assets/icon-close.png';

export default function ModalPersonSelectedMap({ person, closeModal = () => {} }){
    if(person === null) return <></>

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
                        <span>
                            <a about="Link do Whatsapp" title={`Falar com ${person.person_name} pelo whatsapp!`} href={`https://api.whatsapp.com/send?phone=${person.whatsapp}&text=Oi,%20estou%20vindo%20do%20recieco,%20e%20gostaria%20de%20falar%20com%20voc%C3%AA`} target="_blank" rel="noopener noreferrer">
                                {person.whatsapp}
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
                </section>
            </div>
        </div>
    )
}