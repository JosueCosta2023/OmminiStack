import axios from 'axios'

const api = axios.create({
    // Altere a base de acordo com o local que for executar o app
    //  Em casa
     baseURL: 'http://192.168.2.109:3333' 

    //  No mercado
    // baseURL: 'http://10.1.1.248:3333' 
})

export default api;