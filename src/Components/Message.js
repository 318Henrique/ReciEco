import React, { useState, useEffect } from 'react';
import iconClose from '../assets/icon-close.svg';

export default function Message({ message }){
    const [listMessage, setListMessage] = useState([]);

    function removeMessage(idMessage){
        setListMessage(removeListMessage => removeListMessage.filter( list => list.idMessage !== idMessage ))
    }

    useEffect(() => {
        if(message !== null){
            const idMessage = new Date().getTime();
            const newMessage = {
                idMessage: idMessage,
                message: message.content === 'Network Error' ? 'Erro grave!' : message.content ,
                type: message.type || 'error'
            }

            setListMessage(list => [newMessage, ...list])
        }
    }, [message]);

    return(
        <>
        {
           !listMessage.length ?  <></> : 
           <div className="box-control-message">
               {
                   listMessage.map(({ message, type, idMessage }) => (
                        <div className={`message ${type}`} key={idMessage}>
                            {message}
                            <button className='btnClose' onClick={() => removeMessage(idMessage)}>
                                <img src={iconClose} alt='Fechar' />
                            </button>
                        </div>
                    ))
               }
           </div>
        }
        </>
    )
}