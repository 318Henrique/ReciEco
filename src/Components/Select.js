import React,{useState, useEffect} from 'react';

export default function Select({stateValue = () => {}, name, value, options, ...rest}){
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
        <select value={valueInput} name={name} onChange={(content) => handleValue(content.target.value)} {...rest}>
            {options.map((option, index) => (
                <option key={index} value={option.value || option.valueVisible}>{option.valueVisible}</option>
            ))}
        </select>
    )
}