import React, { useState, useEffect } from 'react';
import {getToken, removeToken} from './AuthVerification';
import { Link } from 'react-router-dom';
import iconArrowDown from '../assets/icon-arrow-down.svg';
import '../styles/style.css';

export default function IsSignin({name = 'bruno'}){
    const [online, setOnline] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    function logout(event){
        event.preventDefault();
        removeToken()
        setOnline(false)
    }

    useEffect(() => {
        if(getToken.token_access !== null)
        setOnline(true);

        else
        setOnline(false)
    }, [online])
    
    return(
        <>
        {
            !online ?  
            <Link to='/signin' className='signin-link'>Entrar / Cadastro</Link> :
            <div className='box-control-signin'>
                <button className="btnManagerAccount" onClick={() => setOpenModal(!openModal)}>
                    <span>{name}</span>
                    <img src={iconArrowDown} alt=''/>
                </button>
                {!openModal ? <></> : 
                <div className="modal-manager-account">
                    <div className='links-manager-account'>
                        <Link to='/peoples'>
                            Pessoas
                        </Link>
                    </div>
                    <div className='links-manager-account'>
                        <Link to='/residues'>
                            Resíduos
                        </Link>
                    </div>
                    <div className='links-manager-account'>
                        <Link to='/perfil'>
                            Perfil
                        </Link>
                    </div>
                    <div className='links-manager-account'>
                        <Link to='/logout' onClick={logout}>
                            Sair
                        </Link>
                    </div>
                </div>
                }
            </div>
        }
        </>
    )
}