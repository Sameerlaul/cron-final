const cron = require('node-cron')
const functions = require('./functions')
const sql = require('./database/mssql')

//Cronjob to send reminder mails
cron.schedule('*/1 * * * *', function () {
    const request = new sql.Request();
    const mailData = [];

    request.input('value', false)
        .query('exec GetReminderEmailApplicants', function (err, recordset) {

            if (err) console.log(err)

            // emails = recordset.recordset;
            // console.log(emails);
            for (const record of recordset.recordset) {
                mailData.push(record)
            }

            mailData.forEach(mail => {
                functions.sendEmail(mail.Email, mail.Subject, mail.Template)
                console.log("Mail sent to " + email);

            })
        })
})


