const { Pool } = require('pg');
require('dotenv').config();

// Configuración de la conexión a PostgreSQL
const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false      // Permite conexiones sin certificado válido (usado en entornos de prueba)
    }
});

// Conectar y manejar errores
db.connect()
    .then(() => console.log('Conexión exitosa a PostgreSQL'))
    .catch(err => console.error('Error al conectar a PostgreSQL:', err.stack));

// Crear tabla automáticamente si no existe
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS libros (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        autor VARCHAR(255) NOT NULL,
        edicion INT
    );
`;

db.query(createTableQuery)
    .then(() => {
        console.log('Tabla "libros" verificada/creada exitosamente');
    })
    .catch((err) => {
        console.error('Error al crear la tabla:', err);
    });

// Verificar la base de datos conectada
db.query('SELECT current_database()', (err, res) => {
    if (err) {
        console.error('Error al obtener la base de datos actual:', err);
    } else {
        console.log('Base de datos actual:', res.rows[0].current_database);
    }
});

// Imprimir configuración para depuración
console.log('Configuración de la base de datos:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS);
console.log('DB_NAME:', process.env.DB_NAME);

module.exports = db;