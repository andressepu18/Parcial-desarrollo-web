'use strict';

let express = require('express');
let router = express.Router();
let usuarioController = require('../controllers/usuarios');

// Registrar un nuevo usuario
router.post('/api/usuario/registrar', usuarioController.registrar);

// Login para obtener el token
router.post('/api/usuario/login', usuarioController.login);

module.exports = router;
