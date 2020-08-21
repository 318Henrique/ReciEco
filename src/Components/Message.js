import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import iconClose from '../assets/icon-close.png';

export default function Message({ message }){
    const [listMessage, setListMessage] = useState([]);
    const NavigatorHistory = useHistory();

    function removeMessage(idMessage){
        setListMessage(removeListMessage => removeListMessage.filter( list => list.idMessage !== idMessage ))
    }

    useEffect(() => {
        if(message !== null){
            const { content, type } = message;
            const messageContent = content.response === undefined ? content.message : content.response.data.message;

            if(messageContent === 'redirect') return NavigatorHistory.push('/signin');
            if(messageContent === 'restrict') return NavigatorHistory.push('/restrict-page');

            const idMessage = new Date().getTime();
            const newMessage = {
                idMessage: idMessage,
                message: messageContent === 'Network Error' ? 'Erro grave no sistema!' : messageContent ,
                type: type || 'error'
            }

            setListMessage(list => [newMessage, ...list])
        }
    }, [message, NavigatorHistory]);

    return(
        <>
        {
           !listMessage.length ?  <></> : 
           <div className="box-control-message">
               {
                   listMessage.map(({ message, type, idMessage }) => (
                        <div className={`message ${type}`} key={idMessage}>
                            { message }
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