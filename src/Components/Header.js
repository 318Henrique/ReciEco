import React from 'react';
import LogoBlank from '../assets/logo-blank.svg';
import {Link, useHistory} from 'react-router-dom';
import Singin from './Signin';
import "../styles/style.css";

export default function Header(){
    const History = useHistory();
    return(
        <header className="headerMenu">
            <button className="header-menu-btn-home" onClick={() => History.push('/')}>
                <img src={LogoBlank} alt="ReciEco"/>
                <div className="text-logo">
                    ReciEco
                </div>
            </button>
            <nav className='menu-main'>
                <div>
                    <Link to='/localizar'>
                        Localizar
                    </Link>
                </div>
                <div>
                    <Link to='/cadastro'>
                        Cadastro
                    </Link>
                </div>
            </nav>
            <Singin/>
        </header>
    )
}