const db = require('../config/bd');

const libroModel = {

    async getAll() {
        const query = 'SELECT * FROM libros';
        const { rows } = await db.query(query);
        return rows;
    },

    async getById(id) {
        const query = 'SELECT * FROM libros WHERE id = $1';
        const { rows } = await db.query(query, [id]);
        return rows[0]; // Devuelve un solo resultado o undefined si no existe
    },

    async create(libro) {
        const { titulo, autor, edicion } = libro;
        const query = 'INSERT INTO libros (titulo, autor, edicion) VALUES ($1, $2, $3) RETURNING id';
        const { rows } = await db.query(query, [titulo, autor, edicion]);
        return rows[0].id; // PostgreSQL permite devolver valores con RETURNING
    },

    async update(id, libro) {
        const { titulo, autor, edicion } = libro;
        const query = 'UPDATE libros SET titulo = $1, autor = $2, edicion = $3 WHERE id = $4 RETURNING id';
        const { rowCount } = await db.query(query, [titulo, autor, edicion, id]);
        return rowCount; // Devuelve el número de filas afectadas
    },

    async delete(id) {
        const query = 'DELETE FROM libros WHERE id = $1';
        const { rowCount } = await db.query(query, [id]);
        return rowCount; // Devuelve el número de filas eliminadas
    }

};

module.exports = libroModel;
