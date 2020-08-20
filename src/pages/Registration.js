import React, { useState } from 'react';
import Header from '../Components/Header';
import Input from '../Components/Input';
import Select from '../Components/Select';
import Api from '../Api/api';

export default function Registration(){
    const [dataForm, setDataForm] = useState({});

    function handleData(content){
        const newDataForm = Object.assign(dataForm, content);
        setDataForm(newDataForm)
    }

    async function onSubmit(){
        try {
            console.log(dataForm);
            const response = await Api.post('/signup', dataForm);
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
        <Header/>
        <div>
            <h1>Formulário de cadastro</h1>
            <div className="control-main">
                <div className="box-control-main">
                    <div className="boxField">
                        <label htmlFor='register_type'>Tipo de Cadastro</label>
                        <Select
                            name="register_type"
                            id="register_type"
                            options={[
                                {
                                    valueVisible: "Gerador de Resíduos",
                                },
                                {
                                    valueVisible: "Catador de Resíduos",
                                },
                                {
                                    valueVisible: "Comprador de Resíduos",
                                }
                            ]}
                            stateValue={content => handleData(content)}
                        />
                    </div>
                </div>
                <div className="box-control-main">
                    <div className="boxField">
                        <label htmlFor="person_name">Nome completo</label>
                        <Input name="person_name" id="person_name" type='text' stateValue={content => handleData(content)}
                        />
                    </div>
                </div>
                <div className="box-control-main">
                    <div className="boxField">
                        <label htmlFor="numberDocumentChoise">CPF/CNPJ</label>
                        <Input name="numberDocumentChoise" id="numberDocumentChoise" type='number' stateValue={content => handleData(content)}
                        />
                    </div>
                </div>
                <div className="box-control-main">
                    <div className="boxField">
                        <label htmlFor="whatsapp">Whatsapp</label>
                        <Input name="whatsapp" id="whatsapp" type='tel' maxLength='11' stateValue={content => handleData(content)}
                        />
                    </div>
                    <div className="boxField">
                        <label htmlFor="mail">E-mail</label>
                        <Input name="mail" id="mail" type='email' maxLength='255' stateValue={content => handleData(content)}/>
                    </div>
                </div>
                <div className="box-control-main">
                    <div className="boxField boxField20">
                        <label htmlFor="zipcode">CEP</label>
                        <Input name="zipcode" id="zipcode" type='number' stateValue={content => handleData(content)}
                        />
                    </div>
                    <div className="boxField">
                        <label htmlFor="address">Logradouro</label>
                        <Input name="address" id="address" type='text' maxLength={255} stateValue={content => handleData(content)}
                        />
                    </div>
                </div>
                <div className="box-control-main">
                    <div className="boxField boxField20">
                        <label htmlFor="number_address">N° de sua residência</label>
                        <Input name="number_address" id="number_address" type='text' maxLength={10} stateValue={content => handleData(content)}
                        />
                    </div>
                    <div className="boxField">
                        <label htmlFor="neghborhood">Bairro</label>
                        <Input name="neghborhood" id="neghborhood" type='text' maxLength={255} stateValue={content => handleData(content)}
                        />
                    </div>
                </div>
                <div className="box-control-main">
                    <div className="boxField">
                        <label htmlFor="city">Cidade</label>
                        <Input name="city" id="city" type='text' maxLength={255} stateValue={content => handleData(content)}
                        />
                    </div>
                    <div className="boxField boxField20">
                        <label htmlFor="state">UF</label>
                        <Input name="state" id="state" type='text' maxLength={2} stateValue={content => handleData(content)}
                        />
                    </div>
                </div>
                <div className="box-control-main">
                    <div className="boxField">
                        <label htmlFor="password">Senha</label>
                        <Input name="password" id="password" type='password' stateValue={content => handleData(content)}
                        />
                    </div>
                    <div className="boxField">
                        <label htmlFor="password-repeate">Repetir Senha</label>
                        <Input name="password-repeate" id="password-repeate" type='password' stateValue={content => handleData(content)}
                        />
                    </div>
                </div>
                <button onClick={() => onSubmit()}>Salvar</button>
            </div>
        </div>
        </>
    )
}