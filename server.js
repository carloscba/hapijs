const hapi = require('hapi');
const Sequelize = require('sequelize')
const dbConfig = require('./db/config')
db = new Sequelize(dbConfig)

const server = new hapi.Server({
    host: '127.0.0.1',
    port: '3000',
    routes: {
        cors: {
            origin: ['https://*.ngrok.io']
        } 
    }    
});

const init = async () => {
    await server.register([
        {
            plugin: require('./modules/auth/auth.module'),
            options: {
                db
            }
        },
        {
            plugin: require('./modules/actions/actions.module'),
            options: {
                db
            }
        },
        {
            plugin: require('./modules/applications/applications.module'),
            options: {
                db
            }
        },
        {
            plugin: require('./modules/users/users.module'),
            options: {
                db
            }
        },
        {
            plugin: require('./modules/events/events.module'),
            options: {
                db
            }
        }])
    await server.start()
    console.log(`Server runnig at ${server.info.port}`)
}

init();
