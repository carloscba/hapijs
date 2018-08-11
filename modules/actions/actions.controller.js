require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = (db) => {
    const eventsModel = require('./actions.model')(db);


    return {
       async find(req, h) {
            try {
                const tokenData = await jwt.verify(req.query.token, process.env.JWT_KEY)
                const actionData = (tokenData.isAdmin) ? await eventsModel.findAll() : await eventsModel.findById(tokenData.id)  
                return actionData;
            } catch (error) {
                return h.response({
                    "errors": error.errors,
                    "message": error.message
                }).code(400)
            }
        },

        async create(req, h) {
            try {
                const actionData = await eventsModel.create(req.payload);
                if (actionData) {
                    return response
                }
            } catch (error) {
                return h.response({
                    "errors": error.errors,
                    "message": error.message
                }).code(400)
            }
        },

    }

}