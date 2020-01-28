import axios from 'axios' //precisa executar o yarn dev na página backend


const api = axios.create({//chamada da api
    baseURL: 'http://192.168.0.111:3333'
})

export default api