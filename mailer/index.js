require('dotenv').config();
const Mailgun = require('mailgun-js');

//Email config
const mailgun = new Mailgun({
    apiKey: process.env.MAILER_KEY, 
    domain: process.env.MAILER_DOMAIN
});

/**
 * 
 * @param {string} html code of email
 * @param {*} data object with data to replace in html content
 */
function parseContent(html, data){
    for(index in data){
        html = str.replace(new RegExp(`{{${index}}}`, 'g'), data[index]);
    }
    return html
}

/**
 * 
 * @param {*} to email to send
 * @param {*} subject of email
 * @param {*} htmlContent of email
 * @param {*} emailData optional object with data to replace in html template
 */
async function send(to, subject, htmlContent, emailData = {}){

    try{
        const emailConfig = {
            from: process.env.MAILER_FROM,
            to: emailData.to,
            subject: tools.parseContent(subject, emailData),
            html: tools.parseContent(htmlContent, emailData)
        };

        const sendData = mailgun.messages().send(emailConfig)
        return true;

    }catch(error){
        return false;
    }
}

module.exports = { send }