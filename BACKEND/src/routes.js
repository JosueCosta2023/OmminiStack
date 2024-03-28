const express = require('express');
const OngController = require('./controllers/ongConctroller')
const IncidentController = require('./controllers/incidentController')
const ProfileController = require('./controllers/profileController')
const SessionControlle = require('./controllers/sessionController');
const {celebrate, Segments, Joi} = require('celebrate');


// Desestruturação do modulo de Router dop express
const routes = express.Router()

routes.post('/sessions',SessionControlle.create)
// Executando validação dos campos na criação da ong com  celebrate
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}),OngController.create);

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required().min(20).max(255),
        value: Joi.string().required()
    })
}), IncidentController.create);

routes.get('/ongs', OngController.index)

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.index)

routes.get('/profile' ,celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}),ProfileController.index);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}),IncidentController.delete);

// Exportando rotas
module.exports = routes