import React, { useState } from 'react';
import Header from '../Components/Header';
import "../styles/style.css";
import iconAdd from '../assets/icon-add.svg';
import ListResidues from '../Components/ListResidues';

export default function Residues(){
  const [list, setList] = useState([
    {
      id: 1,
      person_name: "Bruno",
      registerType: 'Catador de Resíduos',
      whatsapp: '65984588087'
    },
    {
      id: 2,
      person_name: "Henrique",
      registerType: 'Catador de Resíduos',
      whatsapp: '65984588087'
    },
  ]);


  function removeItem(id){
    setList(prevList => prevList.filter(item => item.id !== id))
  }

  return(
    <>
    <Header/>
    <div className='box-main-form'>
      <div className='header-form'>
        <h1>Lista de Redíduos</h1>
        <button className='add'>
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