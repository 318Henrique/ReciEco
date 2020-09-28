import React, { useState, useRef } from 'react';
import '../styles/style.css';

export default function ListResidues({content, removeItem = () => {}, editItem = () => {}}){
    const AreaManagerActions = useRef();
    const [openActionsManager, handleOpenActionsManager] = useState(false);

    document.querySelector('#root').addEventListener('click', (event) => {
        const parent = event.srcElement.parentNode;
        if(event.srcElement !== AreaManagerActions.current) {
            if(parent !== AreaManagerActions.current) handleOpenActionsManager(false);
        }
    })

    return(
        <div className={`list ${openActionsManager ? 'list-hover' : ''}`}>
            <div className='main-list'>
                <div className="image-list">
                    <img src={content.icon} alt=''/>
                </div>
                <span>{content.residues_name}</span>
            </div>
            <div className={`list-item-secundary ${ content.category }`}>
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
                    <button onClick={() => {
                        handleOpenActionsManager(false);
                        editItem();
                    }}>
                        Editar
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