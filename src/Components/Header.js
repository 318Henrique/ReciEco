import React from 'react';
import LogoBlank from '../assets/logo-blank.svg';
import {Link} from 'react-router-dom';
import Singin from './Signin';
import "../styles/style.css";

export default function Header(){
    return(
        <header className="headerMenu">
            <button className="header-menu-btn-home">
                <img src={LogoBlank} alt="ReciEco"/>
                <div className="text-logo">
                    ReciEco
                </div>
            </button>
            <nav className='menu-main'>
                <div>
                    <Link to='/'>
                        Localizar
                    </Link>
                </div>
                <div>
                    <Link to='/'>
                        Cadastro
                    </Link>
                </div>
            </nav>
            <Singin/>
        </header>
    )
}