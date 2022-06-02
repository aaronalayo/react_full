// import sendgrid from '@sendgrid/mail'
const  sendgrid  = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRIP_API_KEY)

module.exports = sendEmail = ({ to, from, subject, text, html}) => {
    const msg = { to, from, subject, text, html};
    return sendgrid.send(msg)
}