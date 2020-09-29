import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Api from '../Api/api';
import Message from '../Components/Message';

export default function RegistrationResiduesFromPerson(){
    const [ messagePage, newMessage ] = useState(null);
    const [ list, handleList ] = useState([]);
    const [ loading, handleLoading ] = useState(true);
    const LocationNavigator = useLocation();
    const NavigatorHistory = useHistory();

    const getResidues = useCallback(() => {

        async function getMyResidues() {

            if(LocationNavigator.pathname !== '/perfil/meus-residuos') return;

            try {
                const responseContent = await Api.get('/profile/residues');
                const { content } = responseContent.data;

                if(!content.length) return;

                handleList(oldData => oldData.map(residue => {
                    const isSelected = content.filter(myResidue => myResidue.residues_id === residue.id)
                    return isSelected.length ? Object.assign(residue, { checked: true }) : residue
                }))

            } catch (error) {
                newMessage({ content: error })
            }

            handleLoading(false);
        }

        async function getData () {
            try {
                const responseContent = await Api.get('/residues');
                const { content } = responseContent.data;

                if(!content.length) {
                    handleList([]);
                    return newMessage({ content: 'Nenhum resíduo encontrado!' })
                }
                const newContent = content.map(({ id, residues_id, residues_name, icon, category }) => {
                    return {
                        id,
                        residues_id,
                        residues_name,
                        icon,
                        category,
                        checked: false,
                    }
                })
                
                handleList(newContent);
                getMyResidues();

            } catch (error) {
                newMessage({ content: error })
            }
        }

        getData();
    }, [ LocationNavigator.pathname ])

    useEffect(() => {
        getResidues();
    }, [getResidues])

    async function saveResidue(dataResidue){
        try {
            const url = "/residues/person/my/";
            await Api.post(url, { residues: dataResidue.id });

        } catch (error) {
            newMessage({ content: error })
        }
    }

    async function removeResidue(dataResidue){
        try {
            const url = `/residues/person/${dataResidue.id}`;
            await Api.delete(url);
        } catch (error) {
            newMessage({ content: error })
        }
    }

    async function selectResidues(residue){
        handleList(prevList => prevList.map(item => {

            if(item.id === residue.id){
                if(item.checked) {
                    removeResidue(residue)
                }
                else {
                    saveResidue(residue)
                }

                return Object.assign(item, { checked: !item.checked })
            }
            else return item;
        }))
    }

    function finalRegistration(){
        const isCheckedItem = list.filter(item => item.checked)

        if(isCheckedItem.length) return NavigatorHistory.push('/localizar')

        newMessage({ content: "Você precisa selecionar ao menos um resíduo para continuar!" })
    }

    return(
        <>
        <div className="control-main control-main-cadastro">
            <div className='carrosel-cadastro box-controller-residues'>
                <div className='header-box' style={{ flexDirection: "column" }}>
                    <h1>Meus tipos de Resíduos</h1>
                    <h3 style={{ margin: "6px 0" }}>Clique para selecionar seus resíduos</h3>
                </div>
                <div className='control'>
                    {
                        !loading ? <></> :
                        <>
                            <div className="choise-residues-item loading-residues"/>
                            <div className="choise-residues-item loading-residues"/>
                            <div className="choise-residues-item loading-residues"/>
                        </>
                    }
                    {
                        list.map((item) => {
                            const { id, residues_name, icon, checked } = item;
                            return (
                                <div
                                    key={ id }
                                    className={`choise-residues-item ${checked && checked !== undefined ? 'choise-residues-item-selected' : ''}`}
                                    onClick={() => selectResidues(item)}
                                >
                                    <img src={ icon } alt=''/>
                                    <span> { residues_name } </span>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    loading ? <></> : 
                    <button className="btnSubmit" onClick={() => finalRegistration()}>Finalizar cadastro</button>
                }
            </div>
        </div>
        <Message message={messagePage}/>
        </>
    )
}
