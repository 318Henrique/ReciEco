import React, { useState, useRef } from 'react';
import iconClose from '../assets/icon-close.png';
import '../styles/style.css';
import Api from '../Api/api';
import Message from './Message';
import Input from './InputMy';
import InputCheckbox from './InputCheckbox';

export default function ModalBlockPerson({dataInitial, closeModal = () => {}}){
    const [messageRequest, setMessageRequest] = useState(null);
    const formMain = useRef();
    const modal = useRef();
    const [ loading, handleLoading ] = useState(false);
    const [ dataInput, handleDataInput ] = useState({});
    
    function handleValueDataInput(content){
        handleDataInput(prevData => Object.assign(prevData, content));
    }

    async function onSubmit(event){
        event.preventDefault();

        if(loading) return setMessageRequest({ content: 'Aguarde terminar o processo!', type: 'await' })

        handleLoading(true);

        try {

            if(dataInput.blocked){
                if(dataInput.block_reason === '' || dataInput.block_date === '' ){
                    return messageRequest({ content: "Todos os campos são obrigatórios!" })
                }
            }
            else{
                Object.assign(dataInput, { 
                    block_reason: null,
                    block_date: null
                 })
            }

            dataInput['person'] = dataInitial.id

            await Api.put("/access/handle/block", dataInput)

            closeModal(Object.assign({
                isNew: false
            }, dataInitial, dataInput))

        } catch (error) {
            setMessageRequest({ content: error });
        }

        handleLoading(false)
    }

    if(dataInitial === null ) return <></>;

    return(
        <div className='modal-control-box'>
            <div className='content-modal-signin' ref={modal} style={{ overflow: 'hidden' }}>
                <div className="header-modal">
                    <h2>
                        Bloqueio de acesso
                    </h2>
                    <button className='close-modal' onClick={() => closeModal()}>
                        <img src={iconClose} alt="x"/>
                    </button>
                </div>
                <form ref={formMain} onSubmit={event => onSubmit(event)}>
                    <div className='boxField boxFieldCheckbox'>
                        <InputCheckbox
                            name="blocked"
                            id='blocked'
                            type='checkbox'
                            defaultValue={dataInitial.blocked}
                            getData={content => handleValueDataInput(content)}/>
                        <label htmlFor='blocked'>Bloquear</label>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='block_reason'>Razão do bloqueio</label>
                        <Input
                            name="block_reason"
                            id='block_reason'
                            type='text'
                            defaultValue={dataInitial.block_reason === null ? '' : dataInitial.block_reason}
                            getData={content => handleValueDataInput(content)}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='block_date'>Data do bloqueio</label>
                        <Input
                            name="block_date"
                            id='block_date'
                            type='date'
                            defaultValue={dataInitial.block_date }
                            getData={content => handleValueDataInput(content)}/>
                    </div>
                    <button type='submit' className="btnSubmit">{loading ? 'Salvando' : 'Salvar'}</button>
                </form>
            </div>
            <Message message={messageRequest}/>
        </div>
    );
}