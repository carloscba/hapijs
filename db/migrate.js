const dbConfig = require('./config');
const Sequelize = require('sequelize')

db = new Sequelize(dbConfig)

const userModel = require('../models/users')(Sequelize, db);

db.sync({ 
    force: false 
}).then(()=>{
    console.log('suceess')
    process.exit(0)
}).catch((error)=> {
    console.log('error', error)
    process.exit(1)
})