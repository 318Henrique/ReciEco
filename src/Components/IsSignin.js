import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import iconArrowDown from '../assets/icon-arrow.png';
import '../styles/style.css';
import { AuthContext } from '../Context/Auth';

export default function IsSignin(){
    const [openModal, setOpenModal] = useState(false);
    const { userDetail: { isAuthenticate, dataUser }, Logout } = useContext(AuthContext);
    
    return(
        <>
        {
            !isAuthenticate ?  
            <div className='btnSignInHeader'>
                <Link to='/signin' className='signin-link'>Entrar</Link>
            </div>
            :

            <div className='logined'>
                <button className="btnWithNameFoto" onClick={() => setOpenModal(!openModal)}>
                    <div className='foto-header' style={{ backgroundImage: `url(${dataUser.foto})` }}/>
                    <span className='name'>{dataUser.name.substr(0, dataUser.name.indexOf(' '))}</span>
                    <img className='arrow-down' src={iconArrowDown} alt=''/>
                </button>
                {!openModal ? <></> : 
                <div className="modal-manager-account">
                    {
                        !dataUser.admin ? <></> : 
                        <>
                        <li className='links-manager-account'>
                            <Link to='/peoples'>
                                Pessoas
                            </Link>
                        </li>
                        <li className='links-manager-account'>
                            <Link to='/residues'>
                                Resíduos
                            </Link>
                        </li>
                        </>
                    }
                    <li className='links-manager-account'>
                        <Link to='/perfil'>
                            Perfil
                        </Link>
                    </li>
                    <li className='links-manager-account'>
                        <button type='button' onClick={() => Logout()}>
                            Sair
                        </button>
                    </li>
                </div>
                }
            </div>
        }
        </>
    )
}