import React, { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import Api from '../Api/api';
import Message from '../Components/Message';
import { AuthContext } from '../Context/Auth';
import ValidationData from '../Components/ValidationData';
import Input from '../Components/InputMy';

export default function Registration(){
    const formularioCadastro = useRef();
    const [ messagePage, newMessage ] = useState(null);
    const { SignIn, userDetail: { isAuthenticate }, Logout } = useContext(AuthContext);
    const [ saving, handleSave ] = useState(false);
    const fotoInput = useRef();
    const [ imagePreview, newImagePreview ] = useState('');
    const [ dataForm, handleDataForm ] = useState({});
    
    function handleDataFormMain(content){
        handleDataForm(oldData => Object.assign(oldData, content))
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
    
    async function onSubmit(event){
        event.preventDefault();

        if(saving) return newMessage({ content: 'Aguarde o processo de verificação terminar!' })

        handleSave(true);

        const form = new FormData(formularioCadastro.current);

        const { password, confirmed_password } = dataForm;
        const { error, message } = ValidationData(dataForm);

        if(error){
            handleSave(false);
            return newMessage({ content: message })
        }

        if(password !== "" && password !== confirmed_password) {
            handleSave(false)
            return newMessage({ content: "As senhas precisam ser iguais!" })
        }

        const mimetype_reveiced = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg', "application/octet-stream"];
        const { name: nameFoto, size: sizeFoto, type: typeFile } = form.get('foto');
        if(nameFoto === '' && sizeFoto === 0) form.delete('foto');
        if(sizeFoto > (5 * 1024 * 1024)){
            handleSave(false)
            return newMessage({ content: 'Está imagem é maior que 5 MB!' })
        }
        if(!mimetype_reveiced.includes(typeFile)) {
            handleSave(false)
            return newMessage({ content: "Este arquivo selecionado não é permitido! Selecione outro formato." })
        }

        try {
            form.delete('confirmed_password');
            const response = await Api.post('/singup', form);
            SignIn(response.data, '/cadastro/informacoes-pessoais');
        } catch (error) {
            newMessage({ content: error })
        }

        handleSave(false);
    }

    if(isAuthenticate) return (
        <div className='box-error-404'>
            <div className="content-error">
            <span>Você está conectado!<br /> Deseja sair? </span>
                <button
                    style={{
                        width: 145,
                        height: 40,
                        margin: '10px auto',
                        background: '#fff',
                        color: '#333',
                    }}
                    onClick={() => Logout()}>Sim</button>
                <Link to='/'>Não</Link>
            </div>
        </div>
    )

    return(
        <>
        <div className="control-main control-main-cadastro">
            <form ref={formularioCadastro}>
            <div className='carrosel-cadastro'>
                <div className='header-box'>
                    <h1>Seja Bem-Vindo! vamos criar sua conta, é super fácil!</h1>
                </div>
                <div className='control'>
                <h1>Foto de perfil</h1>
                    <div className='boxField file-input'>
                        <label htmlFor='foto'>
                            <img src={imagePreview} alt=''/>
                        </label>
                        <input name="foto" id='foto' type='file' ref={fotoInput} onChange={() => {
                            handleImagePreview()
                        }}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='person_name'>Nome Completo <span>*</span></label>
                        <Input name='person_name' type='text' id='person_name' autoFocus required maxLength={255}  getData={content => handleDataFormMain(content)}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='mail'>E-mail <span>*</span></label>
                        <Input name='mail' id='mail' type='email' required maxLength={255} getData={content => handleDataFormMain(content)}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='password'>Senha <span>*</span></label>
                        <Input name='password' type='password' id='password' required maxLength={50} getData={content => handleDataFormMain(content)}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='confirmed_password'>Repita a senha <span>*</span></label>
                        <Input name='confirmed_password' type='password' id='confirmed_password' required maxLength={50} getData={content => handleDataFormMain(content)}/>
                    </div>
                    <button type='button' className='btnSubmit' onClick={event => onSubmit(event)}>{ saving ? 'Salvando' : "Salvar" }</button>
                </div>
                <Link to="/signin" style={{ margin: 'auto', marginTop: 20 }}>
                    Já tenho conta!
                </Link>
            </div>
            </form>
        </div>
        <Message message={messagePage}/>
        </>
    )
}
