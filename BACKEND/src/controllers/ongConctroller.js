const connection = require('../database/connection')
const crypto = require('crypto');

module.exports = {
    async index(request, response){
        const ongs = await connection('ongs').select("*")
        return response.json(ongs)
    },
    
    async create(request, response){
            // Desestruturando a requisição
    const {name, email, whatsapp, city, uf} = request.body

    // Criando o id aleatorio que servira como login
    const id = crypto.randomBytes(4).toString('HEX');

    // Iniciando a conexao com o db e inserindo os dados.
    // Devemos identificar o nome da tabela, tipo de ação e os campos que queremos inserir os dados.
    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
    })

    return response.json({id});
    }

}