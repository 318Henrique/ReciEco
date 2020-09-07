import React, { useState, useRef, useContext } from 'react';
import Input from '../Components/Input';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import Api from '../Api/api';
import Message from '../Components/Message';
import axios from 'axios';
import { AuthContext } from '../Context/Auth';
import ValidationData from '../Components/ValidationData';

export default function Registration(){
    const formularioCadastro = useRef();
    const [ messagePage, newMessage ] = useState(null);
    const [ category, handleCategory ] = useState([]);
    const { HandleInfo } = useContext(AuthContext);
    const [ saving, handleSave ] = useState(false);
    const NavigatorHistory = useHistory();
    const [ coords, handleCoords ] = useState({
        coord_lat: null,
        coord_lng: null,
    })

    navigator.geolocation.getCurrentPosition(({ coords }) => {
        handleCoords({
            coord_lat: coords.latitude,
            coord_lng: coords.longitude
        })
    })

    async function onSubmit(event){
        event.preventDefault();

        if(saving) return newMessage({ content: 'Aguarde enquanto salvamos seus dados!' })

        handleSave(true);

        const dataFormCurrent = formularioCadastro.current.getData();
        const { error, message } = ValidationData(dataFormCurrent);

        if(error) return newMessage({ content: message })

        if(!category.length) return newMessage({ content: 'Selecione ao menos um tipo de pessoa!' })

        try {
            const join_data = Object.assign(dataFormCurrent, { type_person: category.toString() }, coords)
            await Api.post('/singup/informacao-pessoal/', join_data);

            HandleInfo(coords);

            NavigatorHistory.push('/localizar');

        } catch (error) {
            newMessage({ content: error })
        }

        handleSave(false)
    }  

    async function getCep(cep){
        if(!/[0-9]{8}/.test(cep)) return;
        try {
            const url = `https://viacep.com.br/ws/${cep}/json/`;
            const response = await axios.get(url);
            const { localidade: city, uf:state, bairro: neghborhood } = response.data;
            
            formularioCadastro.current.setData({ city, state, neghborhood })

        } catch (error) {
            newMessage({ content: error })
        }
    }

    function categoryPerson(event, type){
        const isIncluded = category.includes(type);
        if(isIncluded) handleCategory(prevList => prevList.filter(item => item !== type));
        else handleCategory(prevList => [...prevList, type]);

        event.target.classList.toggle('choise-type-person-selected');
    }

    return(
        <>
        <div className="control-main control-main-cadastro">
            <Form ref={formularioCadastro}>
            <div className='carrosel-cadastro'>
                <div className='header-box'>
                    <h1>Informações pessoais</h1>
                </div>
                <div className='control'>
                    <div className='boxField'>
                        <label htmlFor='document'>CPF/CNPJ <span>*</span></label>
                        <Input name='document' type='text' id='document' required maxLength={14} />
                    </div>
                    <div className='boxField'>
                        <label htmlFor='whatsapp'>Whatsapp</label>
                        <Input name='whatsapp' type='tel' id='whatsapp' placeholder='DD + número' required maxLength={11}/>
                    </div>

                    <div className="boxField">
                        <span>Você é um...?</span>
                        <div className='choise-type-person'>
                            <button className='button-choise-type-person' type='button' onClick={event => categoryPerson(event, 'comprador')}>Comprador</button>
                            <button className='button-choise-type-person' type='button' onClick={event => categoryPerson(event, 'catador')}>Catador</button>
                            <button className='button-choise-type-person' type='button' onClick={event => categoryPerson(event, 'gerador')}>Gerador</button>
                        </div>
                    </div>

                    <div className='boxField'>
                        <label htmlFor='zipcode'>CEP <span>*</span></label>
                        <Input name='zipcode' type='text' id='zipcode' required maxLength={8}  onChange={(event) => getCep(event.target.value)}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='address'>Endereço <span>*</span></label>
                        <Input name='address' type='text' id='address' required maxLength={255}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='address_number'>Número do endereço</label>
                        <Input name='address_number' type='text' id='address_number' maxLength={10}/>
                    </div>
                    <div className='boxField'>
                        <label htmlFor='neghborhood'>Bairro <span>*</span></label>
                        <Input name='neghborhood' type='text' id='neghborhood' required maxLength={100}/>
                    </div>
                    <div className='boxFieldFlex'>
                        <div className='boxField' style={{ width: '80%' }}>
                            <label htmlFor='city'>Cidade <span>*</span></label>
                            <Input name='city' type='text' id='city' required maxLength={255}/>
                        </div>
                        <div className='boxField' style={{ width: '15%' }}>
                            <label htmlFor='state'>UF <span>*</span></label>
                            <Input name='state' type='text' id='state' required maxLength={2}/>
                        </div>
                    </div>
                    <button onClick={event => onSubmit(event)} className='btnSubmit'>{ saving ? 'Salvando' : "Salvar" }</button>
                </div>
            </div>
            </Form> 
        </div>
        <Message message={messagePage}/>
        </>
    )
}
