const nodemailer = require('nodemailer')
const sql = require('./database/mssql')
const Entities = require('html-entities').XmlEntities;

const entities = new Entities();

//function for sending email
async function sendEmail(mailDetails) {
    if(!mailDetails.Email || !mailDetails.Template || !mailDetails.Subject){
        return
    }
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'itachiuchiha3246@gmail.com',
            pass: 'uchihaitachi3246'
        }
    });

    var mailOptions = {
        //from: 'developers.winjit@gmail.com',
        from: mailDetails.DisplayName + ' <itachiuchiha3246@gmail.com>',
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
                .query('exec updateEmailFlag @id ,@flag')  //Update Email Flag after sending mail
        })
        .catch(err => { error: err })

}

module.exports = { sendEmail }