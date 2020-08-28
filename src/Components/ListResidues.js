import React, { useState, useRef } from 'react';
import '../styles/style.css';

export default function ListPerson({content, removeItem = () => {}, editItem = () => {}}){
    const AreaManagerActions = useRef();
    const [openActionsManager, handleOpenActionsManager] = useState(false);

    document.querySelector('#root').addEventListener('click', (event) => {
        if(event.srcElement !== AreaManagerActions) handleOpenActionsManager(false);
    })

    return(
        <div className={`list ${openActionsManager ? 'list-hover' : ''}`}>
            <div>
                {content.residues_name}
            </div>
            <div>
                {content.category}
            </div>
            <button className='btnActions' onClick={() => handleOpenActionsManager(!openActionsManager)}>
                <div></div>
                <div></div>
                <div></div>
            </button>
            {
                !openActionsManager ? <></> :
                <div className='actions-manager' ref={AreaManagerActions}>
                    <button>
                        Editar
                    </button>
                    <button onClick={() => removeItem()}>
                        Excluir
                    </button>
                </div>
            }
        </div>
    )
}