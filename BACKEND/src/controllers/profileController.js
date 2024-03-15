const connection = require("../database/connection");

module.exports = {
    async index(request, response){
        // buscando o id da ong logada
        const ong_id = request.headers.authorization;
        // selecionando os casos de acordo com o id da ong logada
        const incidents = await connection('incident').where('ong_id', ong_id).select('*')
        return response.json(incidents);
    }
}