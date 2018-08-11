const Joi = require('joi');
module.exports = (db) => {
    const authControllers = require('./auth.controller')(db)
    return [
        {
            path: '/api/auth/signin',
            method: 'POST',
            handler: authControllers.signin
        }                    
    ]
}

