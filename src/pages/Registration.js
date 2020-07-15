import React, { useState } from 'react';
import Header from '../Components/Header';
import Input from '../Components/Input';
import Select from '../Components/Select';

export default function Registration(){
    const [dataForm, setDataForm] = useState({});
    const [residues] = useState([
        {
            id: 1,
            imgIcon: '2-papel.png',
            residues_name: 'papel',
            residues_name_final: 'Papel',
        },
        {
            id: 2,
            imgIcon: '9-plastico.png',
            residues_name: 'plastico',
            residues_name_final: 'Plástico',
        },
        {
            id: 3,
            imgIcon: '8-vidros.png',
            residues_name: 'vidro',
            residues_name_final: 'Vidro',
        },
    ]);

    function handleData(content){
        const newDataForm = Object.assign(dataForm, content);
        setDataForm(newDataForm)
    }

    return(
        <>
        <Header/>
        <div>
            <h1>Formulário de cadastro</h1>
            <div className="control-main">
                <div className="box-control-main">
                    <div className="boxField">
                        <label>Tipo de Cadastro</label>
                        <Select
                            name="registerType"
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
                        <label htmlFor="numberDocumentChoise">Digite seu CPF ou CNPJ</label>
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
                        <Input name="address" id="address" type='text' stateValue={content => handleData(content)}
                        />
                    </div>
                </div>
                <div className="box-control-main">
                    <div className="boxField boxField20">
                        <label htmlFor="number_address">N° de sua residência</label>
                        <Input name="number_address" id="number_address" type='text' stateValue={content => handleData(content)}
                        />
                    </div>
                    <div className="boxField">
                        <label htmlFor="neghborhood">Bairro</label>
                        <Input name="neghborhood" id="neghborhood" type='text' stateValue={content => handleData(content)}
                        />
                    </div>
                </div>
                <div className="box-control-main">
                    <div className="boxField">
                        <label htmlFor="city">Cidade</label>
                        <Input name="city" id="city" type='text' stateValue={content => handleData(content)}
                        />
                    </div>
                    <div className="boxField boxField20">
                        <label htmlFor="state">UF</label>
                        <Input name="state" id="state" type='text' stateValue={content => handleData(content)}
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
                <div className='box-control-main boxSelectResidues'>
                    <Input type='hidden' name='residues' typeResidue formField/>
                    {
                        residues.map(residue => {
                            const {id, imgIcon, residues_name, residues_name_final} = residue;
                            return(
                                <div className="boxIcon" residues={residues_name} key={id}>
                                    <img id="imgResidues" src={require(`../assets/${imgIcon}`)} alt=''/>
                                    <span>{residues_name_final}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        </>
    )
}