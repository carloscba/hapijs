require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (db) => {
    const userModel = require('../users/users.model')(db);

    function generateToken(userData) {
        return {
            id: userData.id,
            email: userData.email,
            isAdmin: userData.isAdmin
        }
    }

    return {
        async signup(req, h) {
            try {
                //Encrypt passwod
                if (req.payload) {
                    const encryptedPassword = await bcrypt.hash(req.payload.password, 10)
                    req.payload.password = encryptedPassword;
                }
                //Save user
                const userData = await userModel.create(req.payload);
                //Generate Token to response
                token = await jwt.sign(generateToken(userData), process.env.JWT_KEY);
                console.log("token", token)
                return {
                    token
                };

            } catch (error) {
                return h.response({
                    "errors": error.errors,
                    "message": error.message
                }).code(400)
            }
        },

        async signin(req, h) {
            try {
                //Find user by email
                const userData = await userModel.findOne({
                    where: {
                        email: req.payload.email,
                    }
                })
                if (userData) {
                    //compare saved password and input form
                    const userValid = await bcrypt.compare(req.payload.password, userData.password)
                    if (userValid) {
                        token = await jwt.sign(generateToken(userData), process.env.JWT_KEY);
                        return {
                            token
                        };
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
        async signinemail(req, h) {
            try {
                //Find user by email
                const userData = await userModel.findOne({
                    where: {
                        email: req.payload.email,
                    }
                })
                if (userData) {
                    //compare saved password and input form
                    token = await jwt.sign(generateToken(userData), process.env.JWT_KEY);
                    return {
                        token
                    };
                } else {
                    return h.response({
                        "errors": ['Email don\'t exist'],
                        "message": 'Email don\'t exist'
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