import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import "../../styles/style.css";
import iconAdd from '../../assets/icon-add.png';
import ListPerson from '../../Components/ListPerson';
import Api from '../../Api/api';
import Message from '../../Components/Message';

export default function People(){
  const [list, handleList] = useState([]);
  const [ messagePage, newMessage ] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await Api.get('/admin/person');
        const { content } = response.data;
        
        if(!content.length) return newMessage({ content: "Nenhuma pessoa encontrada!" })

        handleList(content);

      } catch (error) {
        newMessage({ content: error });
      }
    })()
  }, [])

  function removeItem(id){
    handleList(prevList => prevList.filter(item => item.id !== id))
  }

  return(
    <>
    <Header/>
    <div className='box-main box-main-form'>
      <div className='header-form'>
        <h1>Lista de Pessoas</h1>
        <button className='add'>
          <img src={iconAdd} alt=''/>
        </button>
      </div>
      <div className='content-list'>
        {
          list.map(content => <ListPerson
            content={content}
            key={content.id}
            removeItem={idContent => removeItem(idContent)}
            />
          )
        }
      </div>
    </div>
    <Message message={messagePage}/>
    </>
  )
}