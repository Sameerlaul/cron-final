const nodemailer = require('nodemailer')

//function for sending email
async function sendEmail(to, subject, message) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            // user: config.SMTPemailAddress,
            // pass: config.SMTPPassword

            user: 'itachiuchiha3246@gmail.com',
            pass: 'uchihaitachi3246'
        }
    });

    var mailOptions = {
        //from: 'developers.winjit@gmail.com',
        from: 'itachiuchiha3246@gmail.com',
        to: to,
        subject: subject,
        html: message
    };

    try {
        const smsDetails = await transporter.sendMail(mailOptions)
        return smsDetails;
    } catch (error) {
        return error;
    }
}

module.exports = { sendEmail }