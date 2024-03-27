const knex = require('knex')

// Importyando as configurações do banco de dados
const configutarion = require('../../knexfile')

// Criando a conexão com o db e tambem ao db test

const config = process.env.NODE_ENV === test ? configutarion.test : configutarion.development

const connection = knex(config)

// Criamos uma variavel com o nome de connection, ela recebe o knex conectado ao arquivo de configuração, os paramentros nele se referem ao tipo de banco utilizado. Neste nosso caso estamos com o tipo de banco usado para o desenvolvimento da aplicação, quando ficar online o banco utilizado sera do tipo PRODUÇÃO

module.exports = connection