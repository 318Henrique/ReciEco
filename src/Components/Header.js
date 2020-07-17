import React from 'react';
import LogoBlank from '../assets/logo-blank.svg';
import {Link, useHistory} from 'react-router-dom';
import "../styles/style.css";
import iconMapLocationWhite from '../assets/icon-map-white.svg';
import IsSignin from './IsSignin';


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
            <div className='link-map'>
                <Link to='/localizar'>
                    <img src={iconMapLocationWhite} alt=''/>
                    Localizar
                </Link>
            </div>
            <IsSignin/>
        </header>
    )
}