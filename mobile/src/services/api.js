import axios from 'axios'

const api = axios.create({
    // Altere a base de acordo com o local que for executar o app
    //  Em casa
     baseURL: 'http://seuIp:3333' 

})

export default api;