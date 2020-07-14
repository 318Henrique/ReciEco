import React,{useState, useEffect} from 'react';

export default function Field({stateValue = () => {}, name, value, ...rest}){
    const [valueInput, setValueInput] = useState(value || '');

    function handleValue(content){
        setValueInput(content);
    }
    
    useEffect(() => {
        const newObjectContent = {};
        newObjectContent[name] = valueInput
        stateValue(newObjectContent);
    }, [valueInput, stateValue, name]);

    return(
        <input value={valueInput} name={name} onChange={(content) => handleValue(content.target.value)} {...rest}/>
    )
}