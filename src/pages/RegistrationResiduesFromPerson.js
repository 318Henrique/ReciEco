import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Api from '../Api/api';
import Message from '../Components/Message';

export default function RegistrationResiduesFromPerson(){
    const [ messagePage, newMessage ] = useState(null);
    const [ saving, handleSave ] = useState(false);
    const NavigatorHistory = useHistory();
    const [ list, handleList ] = useState([]);

    const getResidues = useCallback(() => {
        async function getData () {
            try {
                const responseContent = await Api.get('/residues');
                const { content } = responseContent.data;

                if(!content.length) {
                    handleList([]);
                    return newMessage({ content: 'Nenhum resíduo encontrado!' })
                }

                handleList(content);

            } catch (error) {
                newMessage({ content: error })
            }
        }

        getData();
    }, [])

    // const MyResidues = useCallback(() => {
    //     async function getData () {
    //         try {
    //             const responseContent = await Api.get('/profile/residues/');
    //             const { content } = responseContent.data;

    //             if(content.length) return;

    //             const newContent = content.map(item => Object.assign(item, { checked: !item.checked }))

    //             handleList(oldData => Object.assign(oldData, newContent))

    //         } catch (error) {
    //             newMessage({ content: error })
    //         }
    //     }

    //     if(Location.pathname === '/perfil/meus-residuos') getData();
    // }, [Location])

    useEffect(() => {
        getResidues();
    }, [getResidues])

    async function saveRegistration(residues_id){
        try {
            await Api.post('/residues/person/my/', { residues: residues_id });
        } catch (error) {
            newMessage({ content: error })
        }
    }

    async function onSubmit(){

        if(saving) return newMessage({ content: 'Aguarde enquanto salvamos seus dados!' })

        handleSave(true);

        
        for await (const item of list) {
            if(item.checked !== undefined && item.checked) await saveRegistration(item.id)
        }

        NavigatorHistory.push('/localizar');

        handleSave(false)
    }

    function selectResidues(id){
        handleList(prevList => prevList.map(item =>{

            if(item.id === id){
                if(item.checked === undefined) return Object.assign(item, { checked: true });
                else return Object.assign(item, { checked: !item.checked })
            }
            else return item;
        }))
    }

    return(
        <>
        <div className="control-main control-main-cadastro rediues">
            <div className='carrosel-cadastro'>
                <div className='header-box'>
                    <h1>Meus tipos de Resíduos</h1>
                </div>
                <div className='control'>
                    {
                        list.map(({ id, residues_name, icon, checked }) => (
                            <div
                                key={ id }
                                className={`choise-residues-item ${checked && checked !== undefined ? 'choise-residues-item-selected' : ''}`}
                                onClick={() => selectResidues(id)}
                            >
                                <img src={ icon } alt=''/>
                                <span> { residues_name } </span>
                            </div>
                        ))
                    }
                </div>
                <button onClick={() => onSubmit()} className='btnSubmit'>{ saving ? 'Salvando' : "Salvar" }</button>
            </div>
        </div>
        <Message message={messagePage}/>
        </>
    )
}
