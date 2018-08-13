require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment')

module.exports = (db) => {
    const eventsModel = require('../events/events.model')(db);
    const actionsModel = require('./actions.model')(db);

    const validateAction = (event, actions) => {
        let valid = false
        if (event.limit === 'unique' && actions.count === 0) {
            valid = true
        } else if (event.limit === 'daily') {

            let sameDay = 0;
            actions.rows.map((item, index) => {
                isSameDay = moment(item.createdAt).isSame(moment(), 'day')
                if (isSameDay) {
                    sameDay++
                }
            })
            valid = (sameDay < event.top)

        } else if (event.limit === 'top' && actions.count < event.top) {
            valid = true
        }
        return valid
    }

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

                const isValid = validateAction(eventData, actionsbyuser);
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