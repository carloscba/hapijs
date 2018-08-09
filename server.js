const hapi = require('hapi');
const server = new hapi.Server({
    host: '127.0.0.1',
    port: '3000'
});

server.route({
    path : '/',
    method : 'GET',
    handler(req, reply){
        return 'Hapi'
    }
})

const init = async () => {
    await server.start()
    console.log(`Server runnig at ${server.info.port}`)
}

init();
