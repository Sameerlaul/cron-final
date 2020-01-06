const config = require('../../config')
const cronjob = require('../cronjob')

const sql = require("mssql");

// connect to your database
sql.connect(config, function (err) {
  if (err) console.log(err);
  else {
    console.log("connection successful");
  }
})

module.exports = sql