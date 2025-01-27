const {Pool} = require('pg');
require('dotenv').config();

const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
});

db.query('SELECT current_database()', (err, res) => {
    if (err) {
        console.error('Error al obtener la base de datos actual:', err);
    } else {
        console.log('Base de datos actual:', res.rows[0].current_database);
    }
});


console.log('Configuración de la base de datos:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('DB_NAME:', process.env.DB_NAME);

module.exports = db;