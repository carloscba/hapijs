module.exports = (Sequelize, db) => {
    const userModel = require('../models/users')(Sequelize, db);
    return {
        create() {

        },
        async find() {
            await userModel.findAll().then((response) => {
                responseData = response;
            }).catch((error) => {
                responseData = error
            });

            return responseData
        },
        async findOne(req) {
            await userModel.findById(req.params.id).then((response) => {
                responseData = response;
            }).catch((error) => {
                responseData = error
            });

            return responseData
        }        
    }

}