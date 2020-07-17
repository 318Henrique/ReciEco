import axios from 'axios';
// baseURL: "https://recieco.herokuapp.com"
const api = axios.create({
    baseURL: "http://localhost:3333"
})

export default api;