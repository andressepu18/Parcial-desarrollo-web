'use strict';

let mongoose = require('mongoose');
let application = require('./application');

// Conecta a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/empresadatos').then(
    () => {
        console.log('Conexión a MongoDB exitosa');
        // Inicia el servidor en el puerto 1702
        application.listen(1702, () => {
            console.log('Servidor iniciado en puerto 1702');
        });
    },
    err => {
        console.error('Error al conectar a MongoDB:', err);
    }
);
