const mysql = require('mysql')
const utils = require('util')

const pool = mysql.createPool({
    host: process.env.host,
    database: process.env.name,
    user: process.env.user,
    
})


pool.getConnection((err) => {
    err ? console.log("No conectado", err.message) : console.log("Conexion establecida")
});

pool.query = utils.promisify(pool.query);

module.exports = pool;