import axios from 'axios';
const serverUrl = {
    local: "http://localhost:3333",
    web: "https://recieco.herokuapp.com"
}
const api = axios.create({
    baseURL: serverUrl.web
})

export default api;