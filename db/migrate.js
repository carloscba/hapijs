const dbConfig = require('./config');
const Sequelize = require('sequelize');

db = new Sequelize(dbConfig)

const applicationsModel = require('../modules/applications/applications.model')(db);
const usersModel = require('../modules/users/users.model')(db);
const eventsModel = require('../modules/events/events.model')(db);
const actionsModel = require('../modules/actions/actions.model')(db);
const emailsModel = require('../modules/emails/emails.model')(db);

usersModel.hasMany(actionsModel, { as: 'userId' });
eventsModel.hasMany(actionsModel, { as: 'eventId' });

applicationsModel.hasMany(eventsModel, { as: 'applicationId' });
applicationsModel.hasMany(emailsModel, { as: 'applicationId2' });


db.sync({
    force: false
}).then(() => {
    console.log('suceess')
    process.exit(0)
}).catch((error) => {
    console.log('error', error)
    process.exit(1)
})