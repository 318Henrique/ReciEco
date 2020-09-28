import React, { useState, useRef } from 'react';
import '../styles/style.css';

export default function ListPerson({content, removeItem = () => {}, setAdmin = () => {}, blockPerson = () => {}, openProfile = () => {}}){
    const AreaManagerActions = useRef();
    const [openActionsManager, handleOpenActionsManager] = useState(false);

    document.querySelector('#root').addEventListener('click', (event) => {
        const parent = event.srcElement.parentNode;
        if(event.srcElement !== AreaManagerActions.current) {
            if(parent !== AreaManagerActions.current) handleOpenActionsManager(false);
        }
    })

    function SplitTypePerson(typePerson){
        const items = typePerson.split(',');
        return (
            <div className='split-residues-from-person'>
            {
                items.map(item => <div className={`type-residues-from-person ${item}`} key={ item }>
                    { item }
                </div>)
            }
            </div>
        )
    }

    return(
        <div className={`list ${openActionsManager ? 'list-hover' : ''}`}>
            <div className='main-list'>
                <div className='image-list'>
                    <img src={content.foto} alt=''/>
                </div>
                <span>{content.person_name}</span>
            </div>
            <div className='list-item-secundary'>
                {
                    content.type_person === null ? <></> :
                    SplitTypePerson(content.type_person)
                }
            </div>
            <div className='list-item-secundary'>
                {content.whatsapp}
            </div>
            <button className='btnActions' onClick={() => handleOpenActionsManager(!openActionsManager)}>
                <div></div>
                <div></div>
                <div></div>
            </button>
            {
                !openActionsManager ? <></> :
                <div className='actions-manager' ref={AreaManagerActions} style={{ width: 200 }}>
                    <button onClick={() => {
                        handleOpenActionsManager(false);
                        openProfile();
                    }}>
                        Ver perfil
                    </button>
                    <button onClick={() => {
                        handleOpenActionsManager(false);
                        setAdmin();
                    }}>
                        {
                            content.admin ? "Remover privilégio" : "Tornar administrador"
                        }
                    </button>
                    <button onClick={() => {
                        handleOpenActionsManager(false);
                        blockPerson();
                    }}>
                        {
                            content.blocked ? "Desbloquear acesso" : "Bloquear acesso"
                        }
                    </button>
                    <button onClick={() => {
                        handleOpenActionsManager(false);
                        removeItem();
                    }}>
                        Excluir
                    </button>
                </div>
            }
        </div>
    )
}