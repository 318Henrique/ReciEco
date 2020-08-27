export default function ValidationData({ document, mail, cep, whatsapp, }){

    if(mail !== undefined && !/@/.test(mail)) return { error: true, message: "E-mail inválido!"}

    if(cep !== undefined && !/[0-9]{8}/.test(cep)) return { error: true, message: "CEP inválido! Verifique se você digitou somente números!"}

    if(document !== undefined && !/[0-9]{14}/.test(document)){
        if(!/[0-9]{11}/) return { error: true, message: "CPF/CNPJ inválido!"}
    }

    if(whatsapp !== undefined && !/[0-9]{11}/.test(whatsapp)) return { error: true, message: "Número de Celular whatsapp inválido! Verifique se você digitou somente números!"}
    
    return{ error: false }
}