const knex = require('knex')

// Importyando as configurações do banco de dados
const configutarion = require('../../knexfile')

// Criando a conexão com o db e tambem ao db test

const config = process.env.NODE_ENV === 'test' ? configutarion.test : configutarion.development

const connection = knex(config)

// Criamos uma variavel com o nome de connection, ela recebe o knex conectado ao arquivo de configuração, o parametro dentro do knex se refere ao modelo de configuração do banco de dados. No nosso  caso estamos utilizando dois modelos de banco, um para produção e outro para realizar os testes. Ele é acionado de acordo com o NPM utilizado.


module.exports = connection