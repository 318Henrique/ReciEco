import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import iconArrowDown from '../assets/icon-arrow-down.svg';
import '../styles/style.css';
import { AuthContext } from '../Context/Auth';

export default function IsSignin({name = 'bruno'}){
    const [openModal, setOpenModal] = useState(false);
    const { userInfo: { authenticate } } = useContext(AuthContext);
    
    return(
        <>
        {
            !authenticate ?  
            <Link to='/signin' className='signin-link'>Entrar / Cadastro</Link> :
            <div className='box-control-signin'>
                <button className="btnManagerAccount" onClick={() => setOpenModal(!openModal)}>
                    <span>{name}</span>
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
                        <button>
                            Sair
                        </button>
                    </div>
                </div>
                }
            </div>
        }
        </>
    )
}