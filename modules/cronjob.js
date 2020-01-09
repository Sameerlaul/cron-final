const cron = require('node-cron')
const functions = require('./functions')
const sql = require('./database/mssql')

//Cronjob to send reminder mails
cron.schedule('*/1 * * * *', function () {
    const request = new sql.Request();

    //Stored Procedure for getting email reminder applicants 
    request.query('exec GetReminderEmailApplicants', function (err, recordset) {

            if (err) console.log(err)
            
            recordset.recordset.forEach(record => {
                //record have properties like 
                //(Email, ApplicantId, Subject, Template, EmailFlag, DisplayName)
                functions.sendEmail(record)
                //console.log("Mail sent to " + record.Email);
            })
        })
})


