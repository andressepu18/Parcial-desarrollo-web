'use strict';

let express = require('express');
let router = express.Router();
let productoController = require('../controllers/productos');
let auth = require('../helpers/auth');

// Crear un nuevo producto - Solo administradores pueden hacerlo
router.post('/api/producto', auth.validateAdmin, productoController.crearProducto);

// Consultar todos los productos - Todos los usuarios autenticados pueden hacerlo
router.get('/api/productos', auth.validateToken, productoController.consultarTodos);

// Consultar un producto por ID - Todos los usuarios autenticados pueden hacerlo
router.get('/api/producto/:productoId', auth.validateToken, productoController.consultarPorId);

// Eliminar un producto - Solo administradores pueden hacerlo
router.delete('/api/producto/:productoId', auth.validateAdmin, productoController.borrarPorId);

// Actualizar un producto - Solo administradores pueden hacerlo
router.put('/api/producto/:productoId', auth.validateAdmin, productoController.actualizarProducto);

module.exports = router;
