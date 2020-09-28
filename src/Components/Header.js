import React from 'react';
import LogoBlank from '../assets/logo-blank.svg';
import { Link } from 'react-router-dom';
import "../styles/style.css";
import IsSignin from './IsSignin';

export default function Header( props ){

    return(
        <header id="headerMenu" {...props}>
            <nav className='header-nav'>
                <div className="link-home-logo">
                    <Link to='/'>
                        <img src={LogoBlank} alt="ReciEco"/>
                        <span>
                            ReciEco
                        </span>
                    </Link>
                </div>
                <div className="links-menu">
                    <li>
                        <Link to='/localizar'>
                            Localizar
                        </Link>
                    </li>
                </div>
                <IsSignin/>
            </nav>
        </header>
    )
}