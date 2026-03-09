const pool = require('../db');

// Obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Usuario ORDER BY nombre');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Usuario WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
    const { nombre, correo, password } = req.body;
    // Validación básica
    if (!nombre) {
        return res.status(400).json({ error: 'El nombre del usuario es obligatorio' });
    }
    if (!password) {
        return res.status(400).json({ error: 'La contraseña del usuario es obligatoria' });
    }
    try {
        const [result] = await pool.query(
            'INSERT INTO Usuario (nombre, correo, password) VALUES (?, ?, ?)',
            [nombre, correo, password]
        );
        res.status(201).json({
            id: result.insertId,
            nombre,
            correo,
            password
        });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

// Actualizar un usuario existente
exports.updateUsuario = async (req, res) => {
    const { nombre, correo, password } = req.body;
    const usuarioId = req.params.id;
    // Validación básica
    if (!nombre) {
        return res.status(400).json({ error: 'El nombre del usuario es obligatorio' });
    }
    if (!password) {
        return res.status(400).json({ error: 'La contraseña del usuario es obligatoria' });
    }
    try {
        // Verificar si el usuario existe
        const [existingUsuario] = await pool.query('SELECT * FROM Usuario WHERE id = ?', [usuarioId]);
        if (existingUsuario.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        // Actualizar el usuario
        await pool.query(
            'UPDATE Usuario SET nombre = ?, correo = ?, password = ? WHERE id = ?',
            [nombre, correo, password, usuarioId]
        );
        res.json({
            id: parseInt(usuarioId),
            nombre,
            correo,
            password
        });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

// Eliminar un usuario
exports.deleteUsuario = async (req, res) => {
    const countryId = req.params.id;
    try {
        // Verificar si el usuario existe
        const [existingCountry] = await pool.query('SELECT * FROM Usuario WHERE id = ?', [countryId]);
        if (existingCountry.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        // Eliminar el usuario
        await pool.query('DELETE FROM Usuario WHERE id = ?', [countryId]);
        res.json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
}
