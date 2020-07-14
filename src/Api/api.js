import axios from 'axios';

const api = axios.create({
    baseURL: "https://recieco.herokuapp.com"
})

export default api;