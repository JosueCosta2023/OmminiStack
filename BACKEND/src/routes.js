const express = require('express');
const OngController = require('./controllers/ongConctroller')
const IncidentController = require('./controllers/incidentController')
const ProfileController = require('./controllers/profileController')
const SessionControlle = require('./controllers/sessionController')
const {celebrate, Segments, Joi} = require('celebrate')

// Desestruturação do modulo de Router dop express
const routes = express.Router()

routes.post('/sessions', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().length(8)
    }).unknown()
}),SessionControlle.create)

routes.get('/ongs', OngController.index)

// Executando validação dos campos na criação da ong com  celebrate
routes.post('/ongs', celebrate({
    [Segments.BODY] : Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })

}) ,OngController.create);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}) ,IncidentController.index)


routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    })
}) ,IncidentController.create);


routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete);


routes.get('/profile',celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required().length(8)
    }).unknown()
}) , ProfileController.index);

// Exportando rotas
module.exports = routes