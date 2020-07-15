import React,{useState} from 'react';
import '../styles/style.css';
import { Link } from 'react-router-dom';
import iconArrowDown from '../assets/icon-arrow-down.svg';

export default function AccountManager({name = 'Bruno Leandro Guimarães Biana'}){
    const [openModal, setOpenModal] = useState(false);

    return(
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
                    <Link to='/logout'>
                        Sair
                    </Link>
                </div>
            </div>
            }
        </div>
    )
}