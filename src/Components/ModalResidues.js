import React, { useState, useRef } from 'react';
import { Form } from '@unform/web';
import Input from './Input';
// import Select from './Select';
import iconClose from '../assets/icon-close.png';
import '../styles/style.css';
import Api from '../Api/api';
import Message from './Message';

export default function ModalResidues({dataInitial, closeModal = () => {}}){
    const [messageRequest, setMessageRequest] = useState(null);
    const dataFormulario = useRef();

    async function onSubmit(){
        try {
            const responseRegister = await Api.post('/admin/residues', dataFormulario.current.getData())
            const { message } = responseRegister.data;

            setMessageRequest({ content: message });

        } catch (error) {
            setMessageRequest({ content: error.response.data.message });
        }
    }

    return(
        <div className='modal-control-box'>
            <div className='content-modal-signin'>
                <div className="header-modal">
                    <h2>
                        Resíduos
                    </h2>
                    <button className='close-modal' onClick={() => closeModal()}>
                        <img src={iconClose} alt="x"/>
                    </button>
                </div>
                <Form ref={dataFormulario} initialData={ dataInitial }>
                    <div className='boxField'>
                        <label htmlFor='residues_name'>Nome do resíduo</label>
                        <Input name="residues_name" id='residues_name' type='text' required/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='category'>Categoria</label>
                        <Input name="category" type='text' id='category' required/>
                    </div>
                    {/* <div className='boxField'>
                        <label>Categoria</label>
                        <Select name="categoria" options={[
                            {
                                valueVisible: 'Escolher',
                            },
                            {
                                value: 'papel',
                                valueVisible: 'Papel',
                            },
                            {
                                value: 'plastico',
                                valueVisible: 'Plástico'
                            },
                            {
                                value: 'vidro',
                                valueVisible: 'Vidro'
                            },
                            {
                                value: 'metal',
                                valueVisible: 'Metal'
                            },
                            {
                                value: 'pneus',
                                valueVisible: 'Pneus'
                            },
                            {
                                value: 'pilhas',
                                valueVisible: 'Pilhas'
                            },
                            {
                                value: 'madeira',
                                valueVisible: 'Madeira'
                            },
                            {
                                value: 'organico',
                                valueVisible: 'Orgânico'
                            },
                            {
                                value: 'residuos-perigosos',
                                valueVisible: 'Resíduos Perigosos'
                            },
                            {
                                value: 'residuos-radioativos',
                                valueVisible: 'Resíduos Radioativos'
                            },
                            {
                                value: 'nao-reciclaveis',
                                valueVisible: 'Não Reciclaveis'
                            },
                            {
                                value: 'ferro-velho',
                                valueVisible: 'Ferro Velho'
                            },
                            {
                                value: 'moveis-usados',
                                valueVisible: 'Móveis Usados'
                            },
                            {
                                value: 'roupas-calcados',
                                valueVisible: 'Roupas/Calçados'
                            },
                            {
                                value: 'lampadas-flourecentes',
                                valueVisible: 'Lâmpadas Flourecentes'
                            },
                        ]} required/>
                    </div> */}
                    <div className='boxField'>
                        <label htmlFor='icon'>Icone do resíduo</label>
                        <Input name="icon" id='icon' type='file' required/>
                    </div>
                </Form>
                <button className="btnSubmit" onClick={(event) => onSubmit(event)}>
                    Salvar
                </button>
            </div>
            <Message message={messageRequest}/>
        </div>
    );
}