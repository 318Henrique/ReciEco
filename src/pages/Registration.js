import React, { useState, useRef, useContext } from 'react';
import Header from '../Components/Header';
import Input from '../Components/Input';
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
    const { SignIn } = useContext(AuthContext);
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
        const { password, confirmed_password, ...rest } = formularioCadastro.current.getData();
        const { error, message } = ValidationData(rest);

        if(error) return newMessage({ content: message })

        if(!category.length) return newMessage({ content: 'Selecione ao menos um tipo de pessoa!' })

        try {
            
            if(password !== "" && password !== confirmed_password) return newMessage({ content: "As senhas precisam ser iguais!" })

            const join_data = Object.assign(rest, { type_person: category.toString(), password }, coords)
            const response = await Api.post('/singup', join_data);

            SignIn(response.data);
        } catch (error) {
            newMessage({ content: error })
        }
    }

    function NavigatorCarrossel(event, section){
        const btnActived = event.target;
        const carroselCadastro = document.querySelector('.carrosel-cadastro');
        const btnsCarrossels = document.querySelectorAll('.control-btns-carrossel button');
        btnsCarrossels.forEach(item => {
            if(item === btnActived) {
                item.classList.add('btnActivedCarrossel');
                carroselCadastro.scrollTo(500 * section, 0);
                document.querySelector('#root').scrollTo(0, 10)
            }
            else item.classList.remove('btnActivedCarrossel');
        })
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
        <Header/>
        <div className="control-main control-main-cadastro">
            <Form ref={formularioCadastro}>
            <div className='carrosel-cadastro'>
                <section className='box person-access'>
                    <h1>Informações de acesso</h1>
                    <div className='control'>
                        <div className='boxField'>
                            <label htmlFor='person_name'>Nome Completo <span>*</span></label>
                            <Input name='person_name' type='text' id='person_name' autoFocus required maxLength={255} />
                        </div>
                        <div className='boxField'>
                            <label htmlFor='mail'>E-mail <span>*</span></label>
                            <Input name='mail' id='mail' type='email' required maxLength={255}/>
                        </div>
                        <div className='boxField'>
                            <label htmlFor='password'>Senha <span>*</span></label>
                            <Input name='password' type='password' id='password' required maxLength={50}/>
                        </div>
                        <div className='boxField'>
                            <label htmlFor='confirmed_password'>Repita a senha <span>*</span></label>
                            <Input name='confirmed_password' type='password' id='confirmed_password' required maxLength={50}/>
                        </div>
                    </div>
                </section>
                <section className='box address'>
                    <h1>Endereço</h1>
                    <div className='control'>
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
                        <div className='boxField'>
                            <label htmlFor='city'>Cidade <span>*</span></label>
                            <Input name='city' type='text' id='city' required maxLength={255}/>
                        </div>
                        <div className='boxField'>
                            <label htmlFor='state'>UF <span>*</span></label>
                            <Input name='state' type='text' id='state' required maxLength={2}/>
                        </div>
                    </div>
                </section>
                <section className='box'>
                    <h1>Últimos detalhes</h1>
                    <div className='control'>
                        <div className='boxField'>
                            <label htmlFor='document'>CPF/CNPJ <span>*</span></label>
                            <Input name='document' type='text' id='document' required maxLength={14} />
                        </div>
                        <div className='boxField'>
                            <label htmlFor='whatsapp'>Whatsapp</label>
                            <Input name='whatsapp' type='tel' id='whatsapp' placeholder='DD + número' required maxLength={11}/>
                        </div>

                        <div>
                            <h4>Escolha sua categoria</h4>
                            <div className='choise-type-person'>
                                <button className='button-choise-type-person' type='button' onClick={event => categoryPerson(event, 'comprador')}>Comprador</button>
                                <button className='button-choise-type-person' type='button' onClick={event => categoryPerson(event, 'catador')}>Catador</button>
                                <button className='button-choise-type-person' type='button' onClick={event => categoryPerson(event, 'gerador')}>Gerador</button>
                            </div>
                        </div>
                        <button onClick={event => onSubmit(event)} className='btnSubmit' style={{ marginTop: 50 }}>Cadastrar</button>
                    </div>
                </section>
            </div>
            </Form>
            <div className='control-btns-carrossel'>
                <button onClick={event => NavigatorCarrossel(event, 0)} className='btnActivedCarrossel'></button>
                <button onClick={event => NavigatorCarrossel(event, 1)}></button>
                <button onClick={event => NavigatorCarrossel(event, 2)}></button>
            </div>
        </div>
        <Message message={messagePage}/>
        </>
    )
}