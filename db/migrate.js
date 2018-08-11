const dbConfig = require('./config');
db = new Sequelize(dbConfig)

const userModel = require('../modules/users/users.model')(db);

db.sync({ 
    force: false 
}).then(()=>{
    console.log('suceess')
    process.exit(0)
}).catch((error)=> {
    console.log('error', error)
    process.exit(1)
})