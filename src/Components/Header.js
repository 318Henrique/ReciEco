import React, { useRef } from 'react';
import LogoBlank from '../assets/logo-blank.svg';
import { Link } from 'react-router-dom';
import "../styles/style.css";
import IsSignin from './IsSignin';

export default function Header(){
    const linksMenu = useRef();
    let distancePageTop = 0;

    const scrollPage = () => {
        const widthRoot = document.querySelector('#root').clientWidth;
        if(widthRoot > 412) return;

        const distanceTop = window.pageYOffset;
        const boxMain = document.querySelector('.control-main');

        if(boxMain === undefined) return;

        if(distanceTop > distancePageTop) {
            boxMain.style.paddingTop = '0';
            linksMenu.current.style.top = '0';
        }
        else {
            boxMain.style.paddingTop = '120px';
            linksMenu.current.style.top = '60px'
        }

        distancePageTop = distanceTop
    }

    window.addEventListener('scroll', () => scrollPage())

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
                <div className="links-menu" ref={linksMenu}>
                    <li>
                        <Link to='/localizar'>
                            Localizar
                        </Link>
                    </li>
                    <li>
                        <Link to='/contact'>
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