import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3333' //acesssando a api do backend
});

export default api;