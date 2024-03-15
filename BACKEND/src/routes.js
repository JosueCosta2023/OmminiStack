const express = require('express');
const OngController = require('./controllers/ongConctroller')
const IncidentController = require('./controllers/incidentController')
const ProfileController = require('./controllers/profileController')
const SessionControlle = require('./controllers/sessionController')

// Desestruturação do modulo de Router dop express
const routes = express.Router()

routes.post('/sessions', SessionControlle.create )

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);







// Exportando rotas
module.exports = routes