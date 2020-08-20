import React,{ useState, useContext } from 'react';
import Input from '../Components/Input';
import '../styles/style.css';
import { Link } from 'react-router-dom';
import Api from "../Api/api";
import { AuthContext } from '../Context/Auth';
import Message from '../Components/Message';

export default function Singin(){
    const [dataForm, handledataForm] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [message, newMessage] = useState(null);
    const [messageProgress, setMessageProgress] = useState('Entrar');
    const { SignIn } = useContext(AuthContext);

    function handleStateForm(content){
        const handleContentDataForm = Object.assign(dataForm, content);
        handledataForm(handleContentDataForm)
    }

    async function onSubmit(){
        setMessageProgress('Verificando...');
        try {
            const responseSignin = await Api.post('/signin', dataForm);
            const dataMainResponse = responseSignin.data;
            SignIn(dataMainResponse);
            
        } catch (error) {
            newMessage({ content: error.response.data.message || error.message })
        }
        setMessageProgress('Entrar');
    }

    return(
        <>
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
                
                <Link to="/cadastro">
                    Cadastrar-se
                </Link>
                <Link to="/forgout">
                    Esqueci minha senha!
                </Link>
            </div>
        </div>
        <Message message={message}/>
        </>
    )
}