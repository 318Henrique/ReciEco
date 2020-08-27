import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Message({ message }){
    const [listMessage, setListMessage] = useState([]);
    const NavigatorHistory = useHistory();

    function removeMessage (idMessage){
        setListMessage(removeListMessage => removeListMessage.filter( list => list.idMessage !== idMessage ))
    }

    useEffect(() => {
        if(message !== null){
            const { content, type } = message;
            let messageContent = content;

            if(content.message !== undefined) messageContent = content.message;
            if(content.response !== undefined) messageContent =  content.response.data.message

            if(messageContent === 'redirect') return NavigatorHistory.push('/signin');
            if(messageContent === 'restrict') return NavigatorHistory.push('/restrict-page');

            const idMessage = new Date().getTime();
            const newMessage = {
                idMessage: idMessage,
                message: messageContent === 'Network Error' ? 'Problemas com a conexão com o sistema!' : messageContent ,
                type: type || 'error'
            }

            setTimeout(() => {
                setListMessage(removeListMessage => removeListMessage.filter( list => list.idMessage !== idMessage ))
            }, 10000)

            setListMessage(list => [newMessage, ...list])
        }
    }, [message, NavigatorHistory]);

    return(
        <>
        {
           !listMessage.length ? <></> : 
           <div className="box-control-message">
               {
                   listMessage.map(({ message, type, idMessage }) => (
                        <div className={`message ${type}`} key={idMessage} onClick={() => removeMessage(idMessage)}>
                            { message }
                        </div>
                    ))
               }
           </div>
        }
        </>
    )
}