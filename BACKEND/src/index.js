const express = require('express');
const cors = require('cors')
const routes = require('./routes')
const { errors } = require('celebrate')

const app = express();

// Adição de componentes de segurança, deixando desta maneira qualquer aplicação de front end pode acessa-la, mas se colocarmos um url especifico o acesso ficara restrito ao url adicionado.
app.use(cors())


//Informando o express sobre o uso de json
app.use(express.json())

app.use(routes)

app.use(errors())

app.listen(3333)