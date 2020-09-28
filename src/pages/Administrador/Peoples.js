import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from '../../Components/Header';
import "../../styles/style.css";
import iconSearch from '../../assets/icon-search.png';
import ListPerson from '../../Components/ListPerson';
import Api from '../../Api/api';
import Message from '../../Components/Message';
import ModalPersonSelectedMap from '../../Components/ModalPersonSelectedMap';
import ModalBlockPerson from '../../Components/ModalBlockPerson';

export default function People(){
  const [list, handleList] = useState([]);
  const [ messagePage, newMessage ] = useState(null);
  const boxSearchRef = useRef();
  const [ search, handleSearch ] = useState('');
  const [ submitSearch, handleSubmitSearch ] = useState(true);
  const [ modal, handleModal ] = useState(null);
  const [ modalBlock, handleModalBlock ] = useState(null)

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

  async function handleAdmin({ id, admin }){
    try {
      await Api.put('/access/handle/admin/', {
        person: id,
        admin : !admin
      });

      handleList(prevList => prevList.map(item => item.id !== id ? item : Object.assign(item, { admin: !admin }) ))
    } catch (error) {
      newMessage({ content: error })
    }
  }

  const handleBlockAccessPerson = (data = null) => {
    if(data !== null) handleList(prevList => prevList.map(item => item.id === data.id ? data : item ))
    handleModalBlock(null);
  }

  function captureKeyEnter({ key }){
    if(key === 'Enter') handleSubmitSearch(true);
  }

  return(
    <>
    <Header className={`${modal !== null ? 'blur' : ''}`}/>
    <div className={`control-main box-main-form ${modal !== null ? 'blur' : ''}`}>
      <div className='header-form'>
        <div className='title-and-add'>
          <h1>Lista de Pessoas</h1>
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
          list.map(content => <ListPerson
            content={content}
            key={content.id}
            removeItem={() => removeItem(content.id)}
            openProfile={() => handleModal(content) }
            setAdmin={ () => handleAdmin(content) }
            blockPerson={ () => handleModalBlock(content)}
            />
          )
        }
      </div>
    </div>
    {
      modal === null ? <></> : <ModalPersonSelectedMap person={modal} admin={true} closeModal={ () => handleModal(null) }/>
    }

    <ModalBlockPerson dataInitial={ modalBlock } closeModal={ content => handleBlockAccessPerson(content) } />

    <Message message={messagePage}/>
    </>
  )
}