'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let routerProductos = require('./routes/productos');  // Router para productos
let routerUsuarios = require('./routes/users');       // Router para usuarios

let application = express();

// Middleware para parsear el body de las peticiones a JSON automáticamente
application.use(bodyParser.json());

// Usa las rutas de productos
application.use(routerProductos);

// Usa las rutas de usuarios
application.use(routerUsuarios);

module.exports = application;
