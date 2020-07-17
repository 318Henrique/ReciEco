import React, { useState } from 'react';
import Header from '../Components/Header';
import "../styles/style.css";
import iconAdd from '../assets/icon-add.svg';
import ListResidues from '../Components/ListResidues';
import ModalAddResidues from '../Components/ModalResidues';

export default function Residues(){
  const [list, setList] = useState([]);
  const [openModal, setOpenModal] = useState(false);


  function removeItem(id){
    setList(prevList => prevList.filter(item => item.id !== id))
  }

  return(
    <>
    <Header/>
    {
      !openModal ? <></> : <ModalAddResidues closeModal={actionModal => setOpenModal(actionModal)}/>
    }
    <div className='box-main-form'>
      <div className='header-form'>
        <h1>Lista de Redíduos</h1>
        <button className='add' onClick={() => setOpenModal(!openModal)}>
          <img src={iconAdd} alt=''/>
        </button>
      </div>
      <div className='content-list'>
        {
          list.map(content => <ListResidues content={content} key={content.id} removeItem={idContent => removeItem(idContent)}/>)
        }
      </div>
    </div>
    </>
  )
}