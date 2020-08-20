import React, { useContext, useState } from 'react';
import LogoBlank from '../assets/logo-blank.svg';
import {Link, useHistory} from 'react-router-dom';
import "../styles/style.css";
import iconMapLocationWhite from '../assets/icon-map-white.svg';
import { AuthContext } from '../Context/Auth';
import iconArrowDown from '../assets/icon-arrow-down.svg';


export default function Header(){
    const History = useHistory();
    const { userDetail: { isAuthenticate, dataUser }, Logout } = useContext(AuthContext);
    const [ openModal, setOpenModal ] = useState(false);

    return(
        <header className="headerMenu">
            <button className="header-menu-btn-home" onClick={() => History.push('/')}>
                <img src={LogoBlank} alt="ReciEco"/>
                <div className="text-logo">
                    ReciEco
                </div>
            </button>
            <div className='link-map'>
                <Link to='/localizar'>
                    <img src={iconMapLocationWhite} alt=''/>
                    Localizar
                </Link>
            </div>
            {
                !isAuthenticate ? <Link to='/signin' className='signin-link'>Entrar / Cadastro</Link> :
                <div className='box-control-signin'>
                    <button className="btnManagerAccount" onClick={() => setOpenModal(!openModal)}>
                        <span>{ dataUser.person_name }</span>
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
                            <Link to='/logout' onClick={Logout}>
                                Sair
                            </Link>
                        </div>
                    </div>
                    }
                </div>
            }
        </header>
    )
}