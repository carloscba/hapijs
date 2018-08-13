require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const Mailer = require('../../mailer');
const tools =require('./actions.tools');

module.exports = (db) => {
    const eventsModel = require('../events/events.model')(db);
    const actionsModel = require('./actions.model')(db);

    return {
        async create(req, h) {
            try {
                const tokenData = await jwt.verify(req.query.token, process.env.JWT_KEY);

                const eventData = await eventsModel.findOne({
                    where: {
                        code: req.payload.code
                    }
                });

                const actionsbyuser = await actionsModel.findAndCountAll({
                    where: {
                        userId: tokenData.id,
                        eventId: eventData.id,
                        valid: true
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ],
                })

                const isValid = tools.validateAction(eventData, actionsbyuser);
                const pointsToSave = (req.payload.points) ? req.payload.points : eventData.points;

                const dataToSave = {
                    userId: tokenData.id,
                    eventId: eventData.id,
                    code: req.payload.code,
                    category: req.payload.category,
                    event: req.payload.event,
                    utm: req.payload.utm,
                    url: req.payload.url,
                    image: req.payload.image,
                    points: pointsToSave,
                    valid: isValid,
                    primaryJson: req.payload.primaryJson,
                    secondayJson: req.payload.secondayJson
                }

                const actionData = await actionsModel.create(dataToSave);
                if (actionData) {
                    //Send email if emailConfig is present
                    if(req.payload.emailConfig){
                        Mailer.send(emailConfig.to, emailConfig.subject)
                    }else{
                        res.status(200).json(actionSaved);
                    }

                    return actionData
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