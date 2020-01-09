const port =normalizePort(process.env.PORT || '3000');
// config for your database
const config = {
    user: 'sa',
    password: 'Ashar@123',
    server: 'localhost',
    database: 'DocuVerusGroupDB',
    email: 'docuverus@gmail.com',
    emailPass: 'winjit@123',
    port: port
};


module.exports = config