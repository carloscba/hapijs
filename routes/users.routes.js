const Joi = require('joi');
module.exports = (Sequelize, db) => {
    const usersControllers = require('../controllers/users.controller')(Sequelize, db)
    return [
        {
            path: '/api/users',
            method: 'GET',
            handler: usersControllers.find
        },
        {
            path: '/api/users/{id}',
            method: 'GET',
            handler: usersControllers.findOne,
            config: {
                validate : {
                    params : Joi.object().keys({
                        id : Joi.number().required()
                    })
                }
            }
        }
    ]
}

