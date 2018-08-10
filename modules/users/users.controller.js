require('dotenv').config();

module.exports = (Sequelize, db) => {
    const userModel = require('../../models/users')(Sequelize, db);
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken')

    return {
       async find(req, h) {
            try {
                const tokenData = await jwt.verify(req.query.token, process.env.JWT_KEY)
                const userData = (tokenData.isAdmin) ? await userModel.findAll() : await userModel.findById(tokenData.id)  
                return userData;
            } catch (error) {
                return h.response({
                    "errors": error.errors,
                    "message": error.message
                }).code(400)
            }
        },

        async findOne(req, h) {
            try {
                const tokenData = await jwt.verify(req.query.token, process.env.JWT_KEY)
                const targetId = (tokenData.isAdmin) ? req.params.id : tokenData.id;
                const userData = await userModel.findById(targetId);
                if (userData) {
                    userData.password = null;
                }
                return userData
            } catch (error) {
                return h.response({
                    "errors": error.errors,
                    "message": error.message
                }).code(400)
            }
        },

        async create(req, h) {
            try {
                const encryptedPassword = await bcrypt.hash(req.payload.password, 10)
                req.payload.password = encryptedPassword;
                const userData = await userModel.create(req.payload);
                if (userData) {
                    userData.password = null;
                    return response
                }
            } catch (error) {
                return h.response({
                    "errors": error.errors,
                    "message": error.message
                }).code(400)
            }
        },

        async update(req, h) {
            try {
                if (req.payload.password) {
                    const encryptedPassword = await bcrypt.hash(req.payload.password, 10)
                    req.payload.password = encryptedPassword;
                }
                const tokenData = await jwt.verify(req.query.token, process.env.JWT_KEY)
                const targetId = (tokenData.isAdmin) ? req.params.id : tokenData.id;                
                const userData = await userModel.update(
                    req.payload,
                    {
                        where: {
                            id: targetId
                        }
                    }
                )
                return userData
            } catch (error) {
                return h.response({
                    "errors": error.errors,
                    "message": error.message
                }).code(400)
            }
        },

        async destroy(req, h) {
            try {
                const tokenData = await jwt.verify(req.query.token, process.env.JWT_KEY)
                const targetId = (tokenData.isAdmin) ? req.params.id : tokenData.id;                    
                const userData = await userModel.destroy({
                    where: {
                        id: targetId
                    }
                })
                return userData;
            } catch (error) {
                return h.response({
                    "errors": error.errors,
                    "message": error.message
                }).code(400)
            }
        },
    }

}