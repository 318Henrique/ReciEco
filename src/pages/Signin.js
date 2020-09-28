import React,{ useState, useContext } from 'react';
import Input from '../Components/Input';
import { Form } from '@unform/web';
import '../styles/style.css';
import { Link } from 'react-router-dom';
import Api from "../Api/api";
import { AuthContext } from '../Context/Auth';
import Message from '../Components/Message';

export default function Singin(){
    const [showPassword, setShowPassword] = useState(false);
    const [message, newMessage] = useState(null);
    const [ progressing, handleProgress] = useState(false);
    const { SignIn } = useContext(AuthContext);


    async function onSubmit(data){
        setShowPassword(false);

        if(progressing) return newMessage({ content: "Aguarde enquanto fazemos nossa verificação!" })

        handleProgress(true);

        const { mail, password } = data;
        if(mail === "" || mail === null) return newMessage({ content:"E-mail é obrigatório!" });

        if(password === "" || password === null) return newMessage({ content:"Senha é obrigatória!" });
        
        
        try {
            const responseSignin = await Api.post('/signin', data);
            const dataMainResponse = responseSignin.data;
            const { content } = dataMainResponse;

            if(content.coords.coord_lat === null) return SignIn(dataMainResponse, '/informacoes-pessoais');

            SignIn(dataMainResponse);
        } catch (error) {
            newMessage({ content: error })
        }
        handleProgress(false);
    }

    return(
        <>
        <div className='box-login'>
           <div className="content-modal-signin" style={{ overflow: 'hidden' }}>
                <div className="header-modal">
                    <h2>
                        Logar-se
                    </h2>
                </div>
                <Form onSubmit={onSubmit}>
                    <div className="boxField">
                        <label htmlFor='mail'>E-mail</label>
                        <Input name="mail" id="mail" type="email" maxLength="255" autoFocus/> 
                    </div>
                    <div className="boxField">
                        <label htmlFor="password">Senha</label>
                        <Input name="password" id="password" type={showPassword ? 'text' : 'password'}/>
                        <button className='btnShowPassword' type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? 'Esconder' : 'Mostrar'}
                        </button>
                    </div>
                    <button type='submit' className="btnSubmit">{ progressing ? 'Verificando...' : 'Entrar' }</button>
                </Form>
                
                <Link to="/cadastro">
                    Criar conta
                </Link>
                <Link to="/forgout">
                    Esqueci minha senha!
                </Link>
                <Link to="/">
                    Voltar para home
                </Link>
            </div>
        </div>
        <Message message={message}/>
        </>
    )
}