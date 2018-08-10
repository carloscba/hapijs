module.exports = (Sequelize, db) => {
    const userModel = require('../../models/users')(Sequelize, db);
    const errorObject = (code, errors, message) => {
        return {
            "statusCode": code,
            "errors": errors,
            "message": message
        }
    }
    const defaultResponse = {
        result: '',
        errors: false,
        message: ''
    }
    return {

        async find(req, h) {
            let res = defaultResponse

            await userModel.findAll().then((response) => {
                res.result = response;
            }).catch((error) => {
                res.message = error.message
                res.errors = error.message.split(',')
            });

            if (res.errors) {
                return h.response(errorObject(400, res.errors, res.message)).code(400)
            } else {
                return res.result;
            }
        },

        async findOne(req, h) {
            let res = defaultResponse

            await userModel.findById(req.params.id).then((response) => {
                res.result = response;
            }).catch((error) => {
                res.message = error.message
                res.errors = error.message.split(',')
            });

            if (res.errors) {
                return h.response(errorObject(400, res.errors, res.message)).code(400)
            } else {
                if(res.result){
                    res.result.password = null;
                    return res.result;
                }else{
                    return h.response(errorObject(400, ['Item not found'], 'Item not found')).code(400)
                }
                
            }
        },

        async create(req, h) {
            let res = defaultResponse

            await userModel.create(req.payload).then((response) => {
                res.result = response;
            }).catch((error) => {
                res.message = error.message
                res.errors = error.message.split(',')
            });

            if (res.errors) {
                return h.response(errorObject(400, res.errors, res.message)).code(400)
            } else {
                res.result.password = null;
                return h.response(res.result);
            }
        },

        async update(req, h) {
            let res = defaultResponse

            await userModel.update(
                req.payload,
                {
                    where: {
                        id: req.params.id
                    }
                }
            ).then((response) => {
                res.result = response;
            }).catch((error) => {
                res.message = error.message
                res.errors = error.message.split(',')
            });

            if (res.errors) {
                return h.response(errorObject(400, res.errors, res.message)).code(400)
            } else {
                return h.response(res.result);
            }
        },

        async destroy(req, h) {
            let res = defaultResponse

            await userModel.destroy({
                where: {
                    id: req.params.id
                }
            }).then((response) => {
                res.result = response;
            }).catch((error) => {
                res.message = error.message
                res.errors = error.message.split(',')
            });

            if (res.errors) {
                return h.response(errorObject(400, res.errors, res.message)).code(400)
            } else {
                return h.response(res.result);
            }
        },
    }

}