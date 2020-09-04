import React, { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import Input from '../Components/Input';
import { Form } from '@unform/web';
import Api from '../Api/api';
import Message from '../Components/Message';
import { AuthContext } from '../Context/Auth';
import ValidationData from '../Components/ValidationData';

export default function Registration(){
    const formularioCadastro = useRef();
    const [ messagePage, newMessage ] = useState(null);
    const { SignIn, userDetail: { isAuthenticate }, Logout } = useContext(AuthContext);
    const [ saving, handleSave ] = useState(false);

    async function onSubmit(event){
        event.preventDefault();

        if(saving) return newMessage({ content: 'Aguarde o processo de verificação terminar!' })

        handleSave(true);

        const { password, confirmed_password, ...rest } = formularioCadastro.current.getData();
        const { error, message } = ValidationData(rest);

        if(error) return newMessage({ content: message })
        if(password !== "" && password !== confirmed_password) return newMessage({ content: "As senhas precisam ser iguais!" })

        try {
            const join_data = Object.assign(rest, { password })
            const response = await Api.post('/singup', join_data);

            SignIn(response.data, '/informacoes-pessoais');
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
            <Form ref={formularioCadastro}>
            <div className='carrosel-cadastro'>
                <div className='header-box'>
                    <h1>Criar conta</h1>
                </div>
                <div className='control'>
                    <div className='boxField'>
                        <label htmlFor='person_name'>Nome Completo <span>*</span></label>
                        <Input name='person_name' type='text' id='person_name' autoFocus required maxLength={255} />
                    </div>
                    <div className='boxField'>
                        <label htmlFor='mail'>E-mail <span>*</span></label>
                        <Input name='mail' id='mail' type='email' required maxLength={255}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='password'>Senha <span>*</span></label>
                        <Input name='password' type='password' id='password' required maxLength={50}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='confirmed_password'>Repita a senha <span>*</span></label>
                        <Input name='confirmed_password' type='password' id='confirmed_password' required maxLength={50}/>
                    </div>
                    <button type='button' className='btnSubmit' onClick={event => onSubmit(event)}>{ saving ? 'Salvando' : "Salvar" }</button>
                </div>
                <Link to="/signin" style={{ margin: 'auto', marginTop: 20 }}>
                    Já tenho conta!
                </Link>
            </div>
            </Form>
        </div>
        <Message message={messagePage}/>
        </>
    )
}
