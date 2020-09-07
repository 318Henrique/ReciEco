import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import Api from '../Api/api';
import Message from '../Components/Message';

export default function Registration(){
    const formularioCadastro = useRef();
    const [ messagePage, newMessage ] = useState(null);
    const [ saving, handleSave ] = useState(false);
    const NavigatorHistory = useHistory();

    async function onSubmit(event){
        event.preventDefault();

        if(saving) return newMessage({ content: 'Aguarde enquanto salvamos seus dados!' })

        handleSave(true);

        const dataFormCurrent = formularioCadastro.current.getData();

        try {
            const join_data = Object.assign(dataFormCurrent)
            await Api.post('/singup/informacao-pessoal/', join_data);

            NavigatorHistory.push('/localizar');

        } catch (error) {
            newMessage({ content: error })
        }

        handleSave(false)
    }

    function selectResidues({ target }){
        target.classList.add('choise-residues-item-selected');
    }

    return(
        <>
        <div className="control-main control-main-cadastro">
            <Form ref={formularioCadastro}>
            <div className='carrosel-cadastro'>
                <div className='header-box'>
                    <h1>Meus tipos de Resíduos</h1>
                </div>
                <div className='control choise-rediues'>
                    {
                        [0, 1, 2, 1,1,1,1,1,1].map(item => (
                            <div className='choise-residues-item' onClick={(event) => selectResidues(event)}>
                                <img src='' alt=''/>
                                <span>
                                    Pneu
                                </span>
                            </div>
                        ))
                    }
                </div>
                <button onClick={event => onSubmit(event)} className='btnSubmit'>{ saving ? 'Salvando' : "Salvar" }</button>
            </div>
            </Form> 
        </div>
        <Message message={messagePage}/>
        </>
    )
}
