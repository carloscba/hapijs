require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = (db) => {
    const userModel = require('../users/users.model')(db);
    return {
        async signin(req, h) {
            try {
                const userData = await userModel.findOne({
                    where: {
                        email: req.payload.email,
                    }
                })

                if (userData) {
                    const userValid = await bcrypt.compare(req.payload.password, userData.password)
                    if (userValid) {
                        try {
                            token = await jwt.sign({
                                id: userData.id,
                                email: userData.email,
                                isAdmin: userData.isAdmin
                            }, process.env.JWT_KEY);
                            return {
                                token
                            };
                        } catch (error) {
                            return h.response({
                                "errors": error.errors,
                                "message": error.message
                            }).code(401)
                        }

                    } else {
                        return h.response({
                            "errors": ['Invalid Password'],
                            "message": 'Invalid Password'
                        }).code(401)
                    }
                } else {
                    return h.response({
                        "errors": ['User don\'t exist'],
                        "message": 'User don\'t exist'
                    }).code(401)
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