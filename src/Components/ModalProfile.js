import React, { useState, useRef, useEffect, useContext } from 'react';
import iconClose from '../assets/icon-close.png';
import '../styles/style.css';
import Api from '../Api/api';
import Message from './Message';
import Input from './InputMy';
import { AuthContext } from '../Context/Auth';

export default function ModalPerson({dataInitial, closeModal = () => {}}){
    const [messageRequest, setMessageRequest] = useState(null);
    const formMain = useRef();
    const modal = useRef();
    const fotoInput = useRef();
    const [ loading, handleLoading ] = useState(false);
    const [ dataInput, handleDataInput ] = useState({});
    const [ imagePreview, newImagePreview ] = useState('');
    const { HandleInfo } = useContext(AuthContext);

    useEffect(() => {
        if(dataInitial !== null) newImagePreview(dataInitial.foto || '');
    }, [dataInitial])
    
    function handleValueDataInput(content){
        handleDataInput(prevData => Object.assign(prevData, content));
    }

    async function onSubmit(event){
        event.preventDefault();

        if(loading) return setMessageRequest({ content: 'Aguarde terminar o processo!', type: 'await' })

        handleLoading(true);

        try {
            const formulario = new FormData(formMain.current);

            const { name: nameFoto, size: sizeFoto } = formulario.get('foto');
            if(nameFoto === '' && sizeFoto === 0) formulario.delete('foto');
            if(sizeFoto > (5 * 1024 * 1024)) return setMessageRequest({ content: 'Está imagem é maior que 5 MB!' })

            for (const field in dataInitial) {
                if(dataInitial[field] === field) formulario.delete(field);
            }

            const response = await Api.put("/profile/my/", formulario)
            const { fotoCurrent } = response.data;

            setMessageRequest({ content: "Perfil atualizado com sucesso!", type: "success" });

            if(fotoCurrent !== undefined || fotoCurrent !== null) { HandleInfo({ foto: fotoCurrent }) }

            closeModal(Object.assign({
                id: dataInitial.id,
                isNew: false
            }, dataInput, { foto: fotoCurrent }))

        } catch (error) {
            setMessageRequest({ content: error });
        }

        handleLoading(false)
    }

    function handleImagePreview(){
        const input = fotoInput.current.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            newImagePreview(reader.result);
        }

        if(input) reader.readAsDataURL(input)
        else newImagePreview('');
    }

    if(dataInitial === null ) return <></>;

    return(
        <div className='modal-control-box'>
            <div className='content-modal-signin' ref={modal}>
                <div className="header-modal">
                    <h2>
                        Perfil
                    </h2>
                    <button className='close-modal' onClick={() => closeModal()}>
                        <img src={iconClose} alt="x"/>
                    </button>
                </div>
                <form ref={formMain} onSubmit={event => onSubmit(event)}>
                    <div className='boxField file-input'>
                        <label htmlFor='foto'>
                            <img src={imagePreview} alt=''/>
                        </label>
                        <input name="foto" id='foto' type='file' ref={fotoInput} onChange={() => {
                            handleImagePreview()
                            handleValueDataInput({ foto: fotoInput.current.value })
                        }}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='person_name'>Nome da pessoa</label>
                        <Input
                            name="person_name"
                            id='person_name'
                            type='text'
                            required
                            defaultValue={dataInitial.person_name}
                            getData={content => handleValueDataInput(content)}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='mail'>E-mail</label>
                        <Input
                            name="mail"
                            id='mail'
                            type='email'
                            required
                            defaultValue={dataInitial.mail}
                            getData={content => handleValueDataInput(content)}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='document'>CPF/CNPJ</label>
                        <Input
                            name="document"
                            id='document'
                            type='text'
                            required
                            defaultValue={dataInitial.document}
                            getData={content => handleValueDataInput(content)}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='whatsapp'>Whatsapp</label>
                        <Input
                            name="whatsapp"
                            id='whatsapp'
                            type='text'
                            required
                            defaultValue={dataInitial.whatsapp}
                            getData={content => handleValueDataInput(content)}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='zipcode'>CEP</label>
                        <Input
                            name="zipcode"
                            id='zipcode'
                            type='text'
                            required
                            defaultValue={dataInitial.zipcode}
                            getData={content => handleValueDataInput(content)}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='address'>Logradouro</label>
                        <Input
                            name="address"
                            id='address'
                            type='text'
                            required
                            defaultValue={dataInitial.address}
                            getData={content => handleValueDataInput(content)}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='address_number'>N° da residência</label>
                        <Input
                            name="address_number"
                            id='address_number'
                            type='text'
                            required
                            defaultValue={dataInitial.address_number}
                            getData={content => handleValueDataInput(content)}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='city'>Cidade</label>
                        <Input
                            name="city"
                            id='city'
                            type='text'
                            required
                            defaultValue={dataInitial.city}
                            getData={content => handleValueDataInput(content)}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='state'>UF</label>
                        <Input
                            name="state"
                            id='state'
                            type='text'
                            required
                            defaultValue={dataInitial.state}
                            getData={content => handleValueDataInput(content)}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='coord_lat'>Latitude</label>
                        <Input
                            name="coord_lat"
                            id='coord_lat'
                            type='text'
                            required
                            defaultValue={dataInitial.coord_lat}
                            getData={content => handleValueDataInput(content)}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='coord_lng'>Longitude</label>
                        <Input
                            name="coord_lng"
                            id='coord_lng'
                            type='text'
                            required
                            defaultValue={dataInitial.coord_lng}
                            getData={content => handleValueDataInput(content)}/>
                    </div>
                    <button type='submit' className="btnSubmit">{loading ? 'Salvando' : 'Salvar'}</button>
                </form>
            </div>
            <Message message={messageRequest}/>
        </div>
    );
}