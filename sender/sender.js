//const Mailer = require('../mailer')
const Confirm = require('prompt-confirm');
const reminderAR = require('./data/htmls/reminder.ar')
const reminderBR = require('./data/htmls/reminder.br')
const reminderCO = require('./data/htmls/reminder.co')
const reminderPA = require('./data/htmls/reminder.pa')
const userList = require('./data/list/inactivosTest')

subject = {
    "AR": " ¡{{name}} aún tienes fotos por subir! ¡Apresúrate!",
    "BR": " {{name}} você ainda tem fotos para subir! Apresse-se!",
    "PA": " ¡{{name}} aún tienes fotos por subir! ¡Apresúrate!",
    "CO": " ¡{{name}} aún tienes fotos por subir! ¡Apresúrate!",
}

html = {
    "AR": reminderAR,
    "BR": reminderBR,
    "PA": reminderPA,
    "CO": reminderCO
}

sender = (userList) => {
    userList.map(async (user, index) => {
        /*
        const sending = await Mailer.send(user.email, subject[user.country], html[user.country], {
            name: user.firstname
        })
        */
        console.log(user.email, user.firstname, user.country)
        /*
        console.log({
            send: user.name,
            status: sending
        })
        */
    })
}

const confirm = new Confirm(`Do you send email to ${userList.RECORDS.length} users`).ask( (answer) => {
    if(answer){
        console.log('sending');
        sender(userList.RECORDS);
    }else{
        console.log('error');        
    }
    
});


