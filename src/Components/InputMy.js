import React,{useState, useCallback} from 'react';

export default function Field({stateValue = () => {}, name, value, ...rest}){
    const [valueInput, setValueInput] = useState(value || '');

    const handleData = useCallback((content) => {
        (async () => {
            const newObjectContent = {};
            newObjectContent[name] = valueInput
            stateValue(newObjectContent);
            setValueInput(content);
        })()
    }, [valueInput, name, stateValue])

    return(
        <input
            value={valueInput}
            name={name}
            onChange={(content) => handleData(content.target.value)}
            onFocus={(event) => event.target.classList.add('focusField')}
            onBlur={(event) => event.target.classList.remove('focusField')}
            {...rest}
        />
    )
}