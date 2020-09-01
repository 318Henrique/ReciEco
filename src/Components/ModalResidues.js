import React, { useState, useRef } from 'react';
import iconClose from '../assets/icon-close.png';
import '../styles/style.css';
import Api from '../Api/api';
import Message from './Message';
import Input from './InputMy';

export default function ModalResidues({dataInitial, closeModal = () => {}}){
    const [messageRequest, setMessageRequest] = useState(null);
    const formMain = useRef();
    const modal = useRef();
    const iconInput = useRef();
    const [ loading, handleLoading ] = useState(false);
    const [ dataInput, handleDataInput ] = useState({});
    const [ imagePreview, newImagePreview ] = useState('');
    
    function handleValueDataInput(content){
        handleDataInput(prevData => Object.assign(prevData, content));
    }

    async function saveNewItem(){
        const { residues_name, category } = dataInput;
        if(residues_name === '' || category === '') return setMessageRequest({ content: 'Todos os campos são obrigatórios!' });

        try {
            const dataFormCurrent = formMain.current
            const formulario = new FormData(dataFormCurrent);

            const { name: nameIcon, size: sizeIcon } = formulario.get('icon');
            
            if(nameIcon === '' && sizeIcon === 0) return setMessageRequest({ content: 'É obrigatório escolher uma imagem para o resíduo!' });
            if(sizeIcon > (5 * 1024 * 1024)) return setMessageRequest({ content: 'Está imagem é maior que 5 MB!' })

            const responseRegister = await Api.post('/admin/residues', formulario)
            const { content: { idNewElement, urlIcon } } = responseRegister.data;

            closeModal({
                id: idNewElement,
                residues_name: dataFormCurrent.residues_name.value,
                icon: urlIcon,
                category: dataFormCurrent.category.value,
                isNew: true
            })

        } catch (error) {
            setMessageRequest({ content: error });
        }
    }

    async function saveUpdateItem(){
        try {
            const formulario = new FormData(formMain.current);
            const { name: nameIcon, size: sizeIcon } = formulario.get('icon');

            if(nameIcon === '' && sizeIcon === 0) formulario.delete('icon');

            if(sizeIcon > (5 * 1024 * 1024)) return setMessageRequest({ content: 'Está imagem é maior que 5 MB!' })

            const responseRegister = await Api.put(`/admin/residues/${dataInitial.id}`, formulario)
            const { urlIcon } = responseRegister.data;

            closeModal({
                id: dataInitial.id,
                residues_name: dataInput.residues_name,
                icon: urlIcon || dataInitial.icon,
                category: dataInput.category,
                isNew: false
            })

        } catch (error) {
            setMessageRequest({ content: error });
        }
    }

    async function onSubmit(event){
        event.preventDefault();

        if(loading) return setMessageRequest({ content: 'Aguarde terminar o processo!', type: 'await' })

        handleLoading(true);

        if(dataInitial.id === undefined) await saveNewItem();
        else await saveUpdateItem();

        handleLoading(false)
    }

    function handleImagePreview(){
        const input = iconInput.current.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            newImagePreview(reader.result);
        }

        if(input) reader.readAsDataURL(input)
        else newImagePreview('');
    }

    return(
        <div className='modal-control-box'>
            <div className='content-modal-signin' ref={modal}>
                <div className="header-modal">
                    <h2>
                        Resíduos
                    </h2>
                    <button className='close-modal' onClick={() => closeModal()}>
                        <img src={iconClose} alt="x"/>
                    </button>
                </div>
                <form ref={formMain} onSubmit={event => onSubmit(event)}>
                    <div className='boxField file-input'>
                        <label htmlFor='icon'>
                            <img src={dataInitial.icon || imagePreview} alt=''/>
                        </label>
                        <input name="icon" id='icon' type='file' ref={iconInput} onChange={() => {
                            handleImagePreview()
                            handleValueDataInput({ icon: iconInput.current.value })
                        }}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='residues_name'>Nome do resíduo</label>
                        <Input
                            name="residues_name"
                            id='residues_name'
                            type='text'
                            required
                            value={dataInitial.residues_name}
                            stateValue={content => handleValueDataInput(content)}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='category'>Categoria</label>
                        <Input
                            name="category"
                            type='text'
                            id='category'
                            required
                            value={dataInitial.category}
                            stateValue={content => handleValueDataInput(content)}/>
                    </div>
                    <button type='submit' className="btnSubmit">{loading ? 'Salvando' : 'Salvar'}</button>
                </form>
            </div>
            <Message message={messageRequest}/>
        </div>
    );
}