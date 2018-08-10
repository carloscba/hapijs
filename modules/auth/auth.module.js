const authRoutes = require('./auth.routes');

const UsersModule = {
    name: 'AuthModule',
    version: '1.0.0',
    register: async function (server, options) {
        server.route(authRoutes(options.Sequelize, options.db));
    }
};

module.exports = UsersModule;