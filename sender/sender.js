const Mailer = require('../mailer')
const Confirm = require('prompt-confirm');
const reminderAR = require('./data/htmls/reminder.ar')
const reminderBR = require('./data/htmls/reminder.br')
const reminderCO = require('./data/htmls/reminder.co')
const reminderPA = require('./data/htmls/reminder.pa')
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
//const userList = require('./data/list/inactivos')

to = {
    "AR": "",
    "BR": "",
    "CO": "",
    "PA": ""
}

subject = {
    "AR": "",
    "BR": "",
    "CO": "",
    "PA": ""
}

html = {
    "AR": reminderAR,
    "BR": reminderBR,
    "CO": reminderCO,
    "PA": reminderPA
}

const countryTarget = 'PA'

const emailConfig = {
    to      : to[countryTarget],
    subject : subject[countryTarget],
    content : entities.decode(html[countryTarget])
}

sender = async () => {
        const sending = await Mailer.send(emailConfig.to, emailConfig.subject, emailConfig.content, {})
        console.log('sending', sending)
}

const confirm = new Confirm(`Do you send email to list ${emailConfig.to}`).ask( (answer) => {
    if(answer){
        console.log('sending');
        sender();
    }else{
        console.log('error');        
    }
    
});


