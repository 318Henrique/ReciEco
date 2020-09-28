import React, { useRef, useCallback } from 'react';

export default function Input({ name, defaultValue, getData = () => {}, ...props }){
    const InputRef = useRef();

    const handleDataField = useCallback(() => {
        const fieldComplete = {};
        fieldComplete[name] = InputRef.current.value;

        getData(fieldComplete)
    }, [getData, name ])
    
    return (
        <input
            ref={InputRef}
            defaultValue={ defaultValue }
            name={name}
            onChange={ () => handleDataField() }
            onFocus={(event) => event.target.classList.add('focusField')}
            onBlur={(event) => event.target.classList.remove('focusField')}
            {...props}
        />
    )
}