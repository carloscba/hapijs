const hapi = require('hapi');
const Sequelize = require('sequelize')
const dbConfig = require('./db/config')
db = new Sequelize(dbConfig)

const server = new hapi.Server({
    host: '127.0.0.1',
    port: '3000'
});

const init = async () => {
    await server.register([{
        plugin : require('./modules/users/users.module'),
        options : {
            Sequelize,
            db
        }
    }])    
    await server.start()
    console.log(`Server runnig at ${server.info.port}`)
}

init();
