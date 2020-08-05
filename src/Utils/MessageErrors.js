export default function MessageErrors(error){
    if(error.response !== undefined)
    return error.response.data.message;

    else
    return error.message
}