'use strict';

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

// Schema de Producto (datos de empresa)
let ProductoSchema = Schema(
    {
        titulo : String,        // Título del producto/dato
        descripcion : String,   // Descripción detallada
        precio : Number,        // Precio del producto/servicio
        creadoPor : String,     // ID del usuario admin que lo creó
        fechaCreacion : Date    // Fecha de creación
    }
);

module.exports = mongoose.model('productos', ProductoSchema);
