import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from '../../Components/Header';
import "../../styles/style.css";
import iconAdd from '../../assets/icon-add.png';
import iconSearch from '../../assets/icon-search.png';
import ListPerson from '../../Components/ListPerson';
import Api from '../../Api/api';
import Message from '../../Components/Message';
import ModalPerson from '../../Components/ModalPerson';

export default function People(){
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
        const response = await Api.get(`/admin/person?query=${search}`);
        const { content } = response.data;
        
        if(!content.length) return newMessage({ content: "Nenhuma pessoa encontrada!" })

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
      await Api.delete(`/admin/person/${id}`);
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

  function activeSearch(isActive){
    if(!boxSearchRef) return;
    
    if(isActive){
      document.querySelector('#root').addEventListener('click', event => {
        const parent = event.srcElement.parentNode;
        if(event.srcElement !== boxSearchRef.current){
          if(parent !== boxSearchRef.current) return boxSearchRef.current.classList.remove('inputSearchActived')
        };
      })

      boxSearchRef.current.classList.add('inputSearchActived');
    }

    else boxSearchRef.current.classList.remove('inputSearchActived');
  }

  function captureKeyEnter({ key }){
    if(key === 'Enter') handleSubmitSearch(true);
  }

  return(
    <>
    <Header className={`${modal.open ? 'blur' : ''}`}/>
    <div className={`control-main box-main-form ${modal.open ? 'blur' : ''}`}>
      <div className='header-form'>
        <h1>Lista de Pessoas</h1>
        <div className='title-search'>
          <div className='inputSearch' onClick={() => activeSearch(true)} ref={boxSearchRef}>
            <button>
              <img src={iconSearch} alt=''/>
            </button>
            <input
              type='search'
              name='search'
              value={ search }
              onChange={({ target }) => handleSearch(target.value) }
              onKeyPress={event => captureKeyEnter(event)}
              onBlur={() => activeSearch(false)}
            />
          </div>
          <button className='add' onClick={() => handleModal({ open: true, data: {} }) }>
            <img src={iconAdd} alt='' title='Novo'/>
          </button>
        </div>
      </div>
      <div className='content-list'>
        {
          list.map(content => <ListPerson
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
      !modal.open ? <></> : <ModalPerson dataInitial={modal.data} closeModal={ data => onCloseModal(data) }/>
    }
    <Message message={messagePage}/>
    </>
  )
}