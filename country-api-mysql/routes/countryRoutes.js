// routes/usuarioRoutes.js
const express = require('express');
const usuarioController =
require('../controllers/countryController');
const router = express.Router();

// Rutas para los usuarios
router.get('/', usuarioController.getAllUsuarios);
router.get('/:id', usuarioController.getUsuarioById);
router.post('/', usuarioController.createUsuario);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);
module.exports = router;