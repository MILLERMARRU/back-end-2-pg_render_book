const Libro = require('../models/libroModel');
const { validationResult } = require('express-validator');


const obtenerLibros = async (req, res) => {
    try {
        const libro = await Libro.getAll();
        res.json(libro);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener libros',detalle: error.message });
    }
};

const obtenerLibroPorId = async (req, res) => {
    try {
        const libro = await Libro.getById(req.params.id);
        if (!libro) {
            res.status(404).json({ error: 'Libro no encontrado' });
        } else {
            res.json(libro);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el libro' });
    }
};

const crearLibro = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }
    try {
        const id = await Libro.create(req.body);
        res.status(201).json({message: 'Libro creado', id});
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el libro' });
    }
};

const actualizarLibro = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }
    try {
        const affectedRows = await Libro.update(req.params.id, req.body);
        if (!affectedRows) {
            res.status(404).json({ error: 'Libro no encontrado' });
        } else {
            res.json({ message: 'Libro actualizado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el libro' });
    }
};

const eliminarLibro = async (req, res) => {
    try {
        const affectedRows = await Libro.delete(req.params.id);
        if (!affectedRows) {
            res.status(404).json({ error: 'Libro no encontrado' });
        } else {
            res.json({ message: 'Libro eliminado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el libro' });
    }
};

module.exports = {
    obtenerLibros,
    obtenerLibroPorId,
    crearLibro,
    actualizarLibro,
    eliminarLibro
};


