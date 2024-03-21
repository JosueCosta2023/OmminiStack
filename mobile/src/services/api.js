import axios from 'axios'

const api = axios.create({
    // Altere a base de acordo com o local que for executar o app
    baseURL: 'http://192.168.2.104:3333'
})

export default api;