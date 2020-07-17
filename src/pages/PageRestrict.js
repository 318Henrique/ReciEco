import React from 'react';
import Logo from '../assets/logo-blank.svg';
import { Link } from 'react-router-dom';
import '../styles/style.css';

export default function PageRestrict(){
    return(
        <div className='box-error-404'>
            <div className="content-error">
                <img src={Logo} alt=''/>
                <h1 className="oops">Eiita!</h1>
                <span>Essa página é restrita!</span>
                <div>Mas não se preocupe, você pode voltar para a página inicial!</div>
                <Link to='/'>Ir para página inicial</Link>
            </div>
        </div>
    )
}