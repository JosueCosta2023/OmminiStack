const express = require('express');
const OngController = require('./controllers/ongConctroller')
const IncidentController = require('./controllers/incidentController')
const ProfileController = require('./controllers/profileController')
const SessionControlle = require('./controllers/sessionController');
const {celebrate, Segments, Joi} = require('celebrate');
const { join } = require('./database/connection');

// Desestruturação do modulo de Router dop express
const routes = express.Router()

routes.post('/sessions',SessionControlle.create)
// Executando validação dos campos na criação da ong com  celebrate
routes.post('/ongs', OngController.create);

routes.post('/incidents', IncidentController.create);

routes.get('/ongs', OngController.index)

routes.get('/incidents',  IncidentController.index)

routes.get('/profile' ,ProfileController.index);

routes.delete('/incidents/:id',IncidentController.delete);

// Exportando rotas
module.exports = routes