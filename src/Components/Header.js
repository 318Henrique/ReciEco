import React, { useRef } from 'react';
import LogoBlank from '../assets/logo-blank.svg';
import { Link } from 'react-router-dom';
import "../styles/style.css";
import IsSignin from './IsSignin';

export default function Header( props ){
    const linksMenu = useRef();

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
                <div className="links-menu" ref={linksMenu}>
                    <li>
                        <Link to='/localizar'>
                            Localizar
                        </Link>
                    </li>
                    <li>
                        <Link to='/Contact'>
                            Contato
                        </Link>
                    </li>
                    <li>
                        <Link to='/about'>
                            Sobre
                        </Link>
                    </li>
                </div>
                <IsSignin/>
            </nav>
        </header>
    )
}