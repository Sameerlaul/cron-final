const nodemailer = require('nodemailer')
const sql = require('./database/mssql')
const Entities = require('html-entities').XmlEntities;
const config = require('../config')

const entities = new Entities();

//function for sending email
async function sendEmail(mailDetails) {
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.email,
            pass: config.emailPass
        }
    });

    var mailOptions = {
        //from: 'developers.winjit@gmail.com',
        from: mailDetails.DisplayName + ' <' + config.email + '>',
        to: mailDetails.Email,
        subject: mailDetails.Subject,
        html: entities.decode(mailDetails.Template)
    };

    await transporter.sendMail(mailOptions)
        .then(result => {
            const reqs = new sql.Request();
            reqs
                .input('id', mailDetails.ApplicantID)
                .input('flag', mailDetails.EmailFlag)
                .query('exec updateEmailFlag @id ,@flag')  //Update EmailFlag after sending mail
        })
        .catch(err => { error: err })

}

module.exports = { sendEmail }