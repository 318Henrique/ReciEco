import React,{useState} from 'react';
import Input from './Input';
import '../styles/style.css';
import { Link } from 'react-router-dom';
import iconClose from '../assets/icon-close.svg';

export default function Singin(){
    const [dataForm, handledataForm] = useState({});
    const [openModal, setOpenModal] = useState(false);

    function handleStateForm(content){
        const handleContentDataForm = Object.assign(dataForm, content);
        handledataForm(handleContentDataForm)
    }

    return(
        <div className='box-control-signin'>
            <button className="btnAuth" onClick={() => setOpenModal(!openModal)}>Entrar</button>
            {!openModal ? <></> : 
            <div className="modal-signin">
                <div className="content-modal-signin">
                    <div className="header-modal">
                        <h2>
                            Logar-se
                        </h2>
                        <button className='close-modal' onClick={() => setOpenModal(!openModal)}>
                            <img src={iconClose} alt="x"/>
                        </button>
                    </div>
                    <div className="boxField">
                        <label>E-mail</label>
                        <Input name="mail" type="email" stateValue={content => handleStateForm(content)} maxLength="255"/> 
                    </div>
                    <div className="boxField">
                        <label>Senha</label>
                        <Input name="password" type="password" stateValue={content => handleStateForm(content)}/> 
                    </div>

                    <button className="btnSubmit">Entrar</button>
                    <Link to="/cadastro">
                        Cadastrar-se
                    </Link>
                    <Link to="/forgout">
                        Esqueci minha senha!
                    </Link>
                </div>
            </div>
            }
        </div>
    )
}