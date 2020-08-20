import React,{ useState, useContext } from 'react';
import '../styles/style.css';
import { Link } from 'react-router-dom';
import iconArrowDown from '../assets/icon-arrow-down.svg';
import { AuthContext } from '../Context/Auth';

export default function AccountManager(){
    const [openModal, setOpenModal] = useState(false);
    const { userDetail : { dataUser }, Logout } = useContext(AuthContext);

    return(
        <div className='box-control-signin'>
            <button className="btnManagerAccount" onClick={() => setOpenModal(!openModal)}>
                <span>{ dataUser.person_name }</span>
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
                    <Link to='/logout' onClick={() => Logout()}>
                        Sair
                    </Link>
                </div>
            </div>
            }
        </div>
    )
}