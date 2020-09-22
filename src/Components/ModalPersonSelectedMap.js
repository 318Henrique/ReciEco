import React from 'react'

export default function ModalPersonSelectedMap({ person }){
    if(person === null) return <></>

    return(
        <div className="modal-marker">
            <div className="marker-actived">
                <div className='perfil-map'>
                    <img src={ person.foto } alt=''/>
                </div>
                <section className="information-person-map">
                    <span className="information-person-map-personName">{person.person_name}</span>
                    <span>{person.mail}</span>
                    <span>{person.whatsapp}</span>
                    <span>{person.address}, {person.address_number} - {person.neghborhood}</span>
                    <span>{person.city}</span>
                </section>
            </div>
        </div>
    )
}