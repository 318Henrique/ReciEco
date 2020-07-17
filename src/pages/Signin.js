import React,{useState } from 'react';
import Input from '../Components/Input';
import '../styles/style.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Api from "../Api/api";
import { addToken } from '../Components/AuthVerification';

export default function Singin(){
    const [dataForm, handledataForm] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const HistoryNavigator = useHistory();
    const LocationNavigator = useLocation();
    const [errMessage, setErrMessage] = useState(null);
    const [messageProgress, setMessageProgress] = useState('Entrar');

    function handleStateForm(content){
        const handleContentDataForm = Object.assign(dataForm, content);
        handledataForm(handleContentDataForm)
    }

    async function onSubmit(){
        setMessageProgress('Verificando...');
        try {
            const responseSignin = await Api.post('/signin', dataForm);
            const {token} = responseSignin.data;
            addToken(token);
            setMessageProgress('Redirecionando ...');
            setTimeout(() => {
                const { from : redirectionPage } = LocationNavigator.state || { from: { pathname: '/localizar' }}
                HistoryNavigator.replace(redirectionPage);
            }, 500)
        } catch (error) {
            const { message } = error.response.data;
            setErrMessage(message)
            setMessageProgress('Entrar');
        }
    }

    return(
        <div className='box-login'>
           <div className="content-modal-signin">
                <div className="header-modal">
                    <h2>
                        Logar-se
                    </h2>
                </div>
                <div className="boxField">
                    <label>E-mail</label>
                    <Input name="mail" type="email" stateValue={content => handleStateForm(content)} maxLength="255"/> 
                </div>
                <div className="boxField">
                    <label>Senha</label>
                    <Input name="password" type={showPassword ? 'text' : 'password'} stateValue={content => handleStateForm(content)}/>
                    <button className='btnShowPassword' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 'Esconder' : 'Mostrar'}
                    </button>
                </div>
                <button className="btnSubmit" onClick={() => onSubmit()}>{messageProgress}</button>

                {
                    errMessage === null ? <></> : 
                    <div className='message-err-form'>
                        {errMessage}
                    </div>
                }
                <Link to="/cadastro">
                    Cadastrar-se
                </Link>
                <Link to="/forgout">
                    Esqueci minha senha!
                </Link>
            </div>
        </div>
    )
}