const Joi = require('joi');
module.exports = (db) => {
    const actionsControllers = require('./actions.controller')(db)
    return [
        {
            path: '/api/actions',
            method: 'POST',
            handler: actionsControllers.create,
            config: {
                validate : {
                    /*
                    payload : Joi.object().keys({
                        code : Joi.string().required()
                    }),
                    */
                    query : Joi.object().keys({
                        token : Joi.string().required()
                    }),
                }
            }            
        },
        
    ]
}

