const connection = require("../database/connection")

module.exports = {
    async create(request, response){

        // Desestruturação do request body para buscar os campos que receberao dados.
        const { title, description, value} = request.body

        // Como o id representa a ong autenticada no sistema, vamos pega-lo atraves do paramenttro Headers
        // Este cabeçalho guarda dados do contexto das requisições. (Localização, autenticação, etc )

        const ong_id = request.headers.authorization;

        // Insertindo dados no banco 
        // vamos realizar uma desestruturação de dados para pegar o id que for gerado quando a inserção for concluida 
        // e retornar esta informação ao cliente para que ele possa fazer o login na plataformas.

        const [id] = await connection('incident').insert({
            title,
            description,
            value,
            ong_id,
        })

        return response.json({id})
    },
    async index(request, response){
        // Criando a paginação

        // Aqui estamos abstraindo o parametro page do resquest query. Por pdrão vamos pegar a 1
        const { page = 1} = request.query

        // Aqui estamos pegando a quantidade de casos cadastrados, o connection retorna um array de informações, nós vamos colocar avariavel dentro de colchetes para que seja possivel pegar a primeira posição automaticamente. 
        const [count] = await connection('incident').count()

        const incidents = await connection('incident')
                .join('ongs', 'ongs.id', '=', 'incident.ong_id')
                // Aqui estamos limitando a quantidade de incidentes por pagina
                .limit(5)
                // Como não podemos multiplicar 5 por 1 realizamos realizamos a multiplicação de page - 1 vezes 5 ai teremos os primeiros 5 resultados
                .offset((page - 1) * 5)

                // Selecionando campos de forma costumizada
                .select([
                    'incident.*', 
                    'ongs.name', 
                    'ongs.email',
                    'ongs.whatsapp', 
                    'ongs.city',
                    'ongs.uf'
                    ])
        
        // Aqui estamois retornando o total de casos atraves do header resposta da requisção
        response.header('X-total-Count', count['count(*)'])

        return response.json(incidents)
    },
    async delete(request, response){
        // A busca destes dois id e para que seja possivel criar uma validação e certificar se a ong que esta querendo deletar o incident e a mesma que esta o criou.
        const { id } = request.params
        const ong_id = request.headers.authorization;
        
        // Nesta parte do codigop a variavel esta armazenando o valor do id logodo e dono do caso, o first serve para pegar a primeira posição dentro do array que sera retornado.
        const incident = await connection('incident')
                                .where('id', id)
                                .select('ong_id')
                                .first();

                                
        // Se o id da ong logada for diferente do id setado no caso, sera retornado um erro de status.
        if(incident.ong_id != ong_id){
            return response.status(401).json({error: 'Operação não permitida.'})
        }

        // Deletando o caso
        await connection('incident').where('id', id).delete();

        return response.status(204).send();
    }
}