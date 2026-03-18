'use strict';

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

// Schema de Usuario con rol (admin o standard)
let UsuarioSchema = Schema(
    {
        username : String,  // Nombre de usuario
        email : String,     // Email del usuario
        password : String,  // Password hasheado
        rol : {             // Rol del usuario: 'admin' o 'standard'
            type: String,
            enum: ['admin', 'standard'],
            default: 'standard'
        }
    }
);

module.exports = mongoose.model('usuarios', UsuarioSchema);
