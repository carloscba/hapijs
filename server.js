const hapi = require('hapi');
const Sequelize = require('sequelize')
const dbConfig = require('./db/config')
db = new Sequelize(dbConfig)
//MODELS
const userModel = require('./models/users')(Sequelize, db);
const usersRoutes = require('./routes/users.routes');

const server = new hapi.Server({
    host: '127.0.0.1',
    port: '3000'
});

server.route(usersRoutes(Sequelize, db));

const init = async () => {
    await server.start()
    console.log(`Server runnig at ${server.info.port}`)
}

init();
