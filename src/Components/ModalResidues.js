import React, { useState } from 'react';
import Input from './Input';
import iconClose from '../assets/icon-close.svg';

export default function ModalResidues({dataInitial}){
    const [dataForm, setDataForm] = useState(dataInitial || {});
    function handleData(content){
        const objectJoin = Object.assign(dataForm, content);
        setDataForm(objectJoin);
    }

    return(
        <div>
            <div>
                <div>
                    <button>
                        <img src={iconClose} alt=''/>
                    </button>
                    <h1>Resíduos</h1>
                </div>
                <div>
                    <label>Nome do resíduo</label>
                    <Input name="residues_name" value={dataForm.residues_name} stateValue={content => handleData(content)} required/>
                </div>
                <div>
                    <label>Categoria</label>
                    <Input name="residues_name_final" value={dataForm.residues_name_final} stateValue={content => handleData(content)} required/>
                </div>
                <div>
                    <label>Icone</label>
                    <Input name="iconImg" value={dataForm.iconImg} stateValue={content => handleData(content)} required/>
                </div>
                <button>
                    Salvar
                </button>
            </div>
        </div>
    );
}