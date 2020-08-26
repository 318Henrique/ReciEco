import React, { useContext, useState } from 'react';
import LogoBlank from '../assets/logo-blank.svg';
import { Link } from 'react-router-dom';
import "../styles/style.css";
import { AuthContext } from '../Context/Auth';

export default function Header(){
    const { userDetail: { isAuthenticate, dataUser }, Logout } = useContext(AuthContext);
    const [ openModal, setOpenModal ] = useState(false);

    return(
        <header className="headerMenu">
            <nav className='header-nav'>
                <div className="link-home-logo">
                    <Link to='/'>
                        <img src={LogoBlank} alt="ReciEco"/>
                        <span>
                            ReciEco
                        </span>
                    </Link>
                </div>

                <li>
                    <Link to='/localizar'>
                        Localizar
                    </Link>
                </li>
                <li>
                    <Link to='/localizar'>
                        Contato
                    </Link>
                </li>
                <li>
                    <Link to='/localizar'>
                        Sobre
                    </Link>
                </li>
            </nav>
            
        </header>
    )
}