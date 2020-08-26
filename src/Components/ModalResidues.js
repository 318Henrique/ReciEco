import React, { useState } from 'react';
import Input from './Input';
import Select from './Select';
import iconClose from '../assets/icon-close.png';
import '../styles/style.css';
import Api from '../Api/api';

export default function ModalResidues({dataInitial, closeModal = () => {}}){
    const [dataForm, setDataForm] = useState(dataInitial || {});
    const [messageRequest, setMessageRequest] = useState(null);
    function handleData(content){
        const objectJoin = Object.assign(dataForm, content);
        setDataForm(objectJoin);
    }

    async function register(){
        try {
            const responseRegister = await Api.post('/admin/residues', dataForm)
            const { message } = responseRegister.data;
            setMessageRequest(message);

        } catch (error) {
            setMessageRequest(error.response.data.message);
        }
    }

    // function checkEmpty (field){
    //     console.log(field)
    //     return field !== '' || field !== null ? true : false;
    // }
    function onSubmit(){
        register();
    }

    return(
        <div className='modal-control-box'>
            <div className='content-modal-signin'>
                <div className="header-modal">
                    <h2>
                        Resíduos
                    </h2>
                    <button className='close-modal' onClick={() => closeModal(false)}>
                        <img src={iconClose} alt="x"/>
                    </button>
                </div>
                <div className='boxField'>
                    <label>Nome do resíduo</label>
                    <Input name="residues_name" type='text' value={dataForm.residues_name} stateValue={content => handleData(content)} required/>
                </div>
                <div className='boxField'>
                    <label>Categoria</label>
                    <Select name="categoria" value={dataForm.categoria} options={[
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
                    ]} stateValue={content => handleData(content)} required/>
                </div>
                <div className='boxField'>
                    <label>Link do icone</label>
                    <Input name="iconImg" type='text' value={dataForm.iconImg} stateValue={content => handleData(content)} required/>
                </div>
                <button className="btnSubmit" onClick={() => onSubmit()}>
                    Salvar
                </button>
                {
                    messageRequest !== null ? 
                    <div className='message-main'>
                        {messageRequest}
                    </div>
                    : <></>
                }
            </div>
        </div>
    );
}