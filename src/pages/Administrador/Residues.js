import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from '../../Components/Header';
import "../../styles/style.css";
import iconAdd from '../../assets/icon-add.png';
import iconSearch from '../../assets/icon-search.png';
import ListResidues from '../../Components/ListResidues';
import Api from '../../Api/api';
import Message from '../../Components/Message';
import ModalResidues from '../../Components/ModalResidues';

export default function Residues(){
  const [list, handleList] = useState([]);
  const [ messagePage, newMessage ] = useState(null);
  const boxSearchRef = useRef();
  const [ search, handleSearch ] = useState('');
  const [ submitSearch, handleSubmitSearch ] = useState(true);
  const [ modal, handleModal ] = useState({
    open: false,
    data: {}
  })

  const getData = useCallback(() => {
    async function requestData () {
      try {
        const response = await Api.get(`/residues?query=${search}`);
        const { content } = response.data;
        
        if(!content.length) return newMessage({ content: "Nenhum resíduo encontrado!" })

        handleList(content);

      } catch (error) { newMessage({ content: error }); }

      handleSubmitSearch(false);
    }

    if(submitSearch || search === '') return requestData();

  }, [search, submitSearch])

  useEffect(() => {
    getData();
  }, [getData])

  async function removeItem(id){
    try {
      await Api.delete(`/admin/residues/${id}`);
      handleList(prevList => prevList.filter(item => item.id !== id))
    } catch (error) {
      newMessage({ content: error })
    }
  }

  function onCloseModal(data){
    if(data === undefined) handleModal({ open: false, data: {} })
    else {
      handleModal({ open: false, data: {} })
      
      const { isNew, ...rest } = data;

      if(isNew) return handleList(prevList => [...prevList, rest]);
      else return handleList(prevList => prevList.map(item => item.id === rest.id ? rest : item))
    }
  }

  function captureKeyEnter({ key }){
    if(key === 'Enter') handleSubmitSearch(true);
  }

  return(
    <>
    <Header className={`${modal.open ? 'blur' : ''}`}/>
    <div className={`control-main box-main-form ${modal.open ? 'blur' : ''}`}>
      <div className='header-form'>
        <div className='title-and-add'>
          <h1>Lista de Resíduos</h1>
          <button className='add' onClick={() => handleModal({ open: true, data: {} }) }>
            <img src={iconAdd} alt='' title='Novo'/>
          </button>
        </div>
        <div className='filter-search'>
          <div className='inputSearch' ref={boxSearchRef}>
            <button>
              <img src={iconSearch} alt=''/>
            </button>
            <input
              type='search'
              name='search'
              value={ search }
              placeholder="Digite um nome e aperte Enter"
              onChange={({ target }) => handleSearch(target.value) }
              onKeyPress={event => captureKeyEnter(event)}
              onFocus={() => boxSearchRef.current.classList.add('inputSearchActived')}
              onBlur={() => boxSearchRef.current.classList.remove('inputSearchActived')}
            />
          </div>
          <button className='filter'>
            <img src={require('../../assets/icon-filter.png')} alt=""/>
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
      !modal.open ? <></> : <ModalResidues dataInitial={modal.data} closeModal={ data => onCloseModal(data) }/>
    }
    <Message message={messagePage}/>
    </>
  )
}