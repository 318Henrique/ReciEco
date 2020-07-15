import React, { useState } from 'react';
import '../styles/style.css';

export default function ListResidues({content, removeItem = () => {}}){
    const [openActionsManager, setOpenActionsManager] = useState(false);
    return(
        <div className='list'>
            <div>
                {content.person_name}
            </div>
            <div>
                {content.registerType}
            </div>
            <div>
                {content.whatsapp}
            </div>
            <button className='btnActions' onClick={() => setOpenActionsManager(!openActionsManager)}>
                <div></div>
                <div></div>
                <div></div>
            </button>
            {
                !openActionsManager ? <></> :
                <div className='actions-manager'>
                    <button>
                        Editar
                    </button>
                    <button onClick={() => removeItem(content.id)}>
                        Excluir
                    </button>
                </div>
            }
        </div>
    )
}