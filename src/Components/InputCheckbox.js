import React, { useState, useRef, useEffect } from 'react';

export default function InputCheckBox({ name, defaultValue, getData = () => {}, ...props }){
    const [ checked, handleCheck ] = useState(false);
    const InputRef = useRef();

    const handleDataField = () => {

        handleCheck(InputRef.current.checked)
        getData({ [name]: InputRef.current.checked })

    }

    useEffect(() => {
        handleCheck(defaultValue)
    }, [ defaultValue ])
    
    return (
        <input
            ref={InputRef}
            checked={ checked }
            name={name}
            onChange={ () => handleDataField() }
            {...props}
        />
    )
}