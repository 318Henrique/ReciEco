import React, { useState, useEffect, useRef } from 'react';
import Header from '../../Components/Header';
import "../../styles/style.css";
import iconAdd from '../../assets/icon-add.png';
import iconSearch from '../../assets/icon-search.png';
import ListResidues from '../../Components/ListResidues';
import Api from '../../Api/api';
import Message from '../../Components/Message';
import ModalResidues from '../../Components/ModalResidues';

export default function People(){
  const [list, handleList] = useState([]);
  const [ messagePage, newMessage ] = useState(null);
  const searchRef= useRef();
  const [ modal, handleModal ] = useState({
    open: false,
    data: {}
  })

  useEffect(() => {
    (async () => {
      try {
        const response = await Api.get('/admin/residues');
        const { content } = response.data;
        
        if(!content.length) return newMessage({ content: "Nenhum resíduo encontrado!" })

        handleList(content);

      } catch (error) {
        newMessage({ content: error });
      }
    })()
  }, [])

  function removeItem(id){
    handleList(prevList => prevList.filter(item => item.id !== id))
  }

  function onCloseModal(data){
    if(data === undefined) handleModal({ open: false, data: {} })
  }

  function activeSearch(isActive){
    if(!searchRef) return;
    
    if(isActive){
      document.querySelector('#root').addEventListener('click', event => {
        if(event.srcElement !== searchRef.current) return searchRef.current.classList.remove('inputSearchActived');
      })

      searchRef.current.classList.add('inputSearchActived');
    }

    else searchRef.current.classList.remove('inputSearchActived');
  }

  return(
    <>
    <Header/>
    <div className='control-main box-main-form'>
      <div className='header-form'>
        <h1>Lista de Resíduos</h1>
        <div className='title-search'>
          <div className='inputSearch' onClick={() => activeSearch(true)} ref={searchRef}>
            <button>
              <img src={iconSearch} alt=''/>
            </button>
            <input type='search' name='search' onBlur={() => activeSearch(false)}/>
          </div>
          <button className='add' onClick={() => handleModal({ open: true, data: {} }) }>
            <img src={iconAdd} alt='' title='Novo'/>
          </button>
        </div>
      </div>
      <div className='content-list'>
        {
          list.map(content => <ListResidues
            content={content}
            key={content.id}
            removeItem={() => removeItem(content.id)}
            editItem={() => handleModal({ open: true, data: content }) }
            />
          )
        }
      </div>
    </div>
    {
      !modal.open ? <></> : <ModalResidues closeModal={ data => onCloseModal(data) }/>
    }
    <Message message={messagePage}/>
    </>
  )
}