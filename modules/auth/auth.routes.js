const Joi = require('joi');
module.exports = (Sequelize, db) => {
    const authControllers = require('./auth.controller')(Sequelize, db)
    return [
        {
            path: '/api/auth/signin',
            method: 'POST',
            handler: authControllers.signin
        }                    
    ]
}

