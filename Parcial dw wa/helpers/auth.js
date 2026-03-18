'use strict';

let jwt = require('jwt-simple');
let moment = require('moment');

// Clave secreta para firmar los tokens
let secret = 'asdayiuttyi34578.,,qw';

// Función para crear el token JWT con los datos del usuario incluyendo el rol
function createToken(usuario){
    let payload = {
        sub: usuario._id,          // ID del usuario
        username: usuario.username, // Nombre de usuario
        email: usuario.email,       // Email
        rol: usuario.rol,           // Rol del usuario (admin o standard)
        iat: moment().unix(),       // Fecha de emisión
        exp: moment().add(5, 'minutes').unix() // Fecha de expiración
    };
    return jwt.encode(payload, secret);
}

// Middleware para validar que el token sea válido
function validateToken(req, res, next){
    try{
        // Extrae el token del header Authorization
        let token = req.headers.authorization.replace('Bearer ', '');
        // Decodifica el token usando la clave secreta
        let payload = jwt.decode(token, secret);
        // Guarda la información del usuario en el request para usarla después
        req.usuario = {
            id: payload.sub,
            username: payload.username,
            email: payload.email,
            rol: payload.rol
        };
        next(); // Continúa con la siguiente función
    }
    catch(ex){
        res.status(401).send({ message: 'Token inválido'});
    }
}

// Middleware para validar que el usuario sea administrador
function validateAdmin(req, res, next){
    try{
        // Extrae el token del header Authorization
        let token = req.headers.authorization.replace('Bearer ', '');
        // Decodifica el token
        let payload = jwt.decode(token, secret);
        
        // Verifica si el rol es 'admin'
        if(payload.rol !== 'admin'){
            return res.status(403).send({ 
                message: 'No tienes permisos para realizar esta acción. Se requiere rol de administrador.' 
            });
        }
        
        // Guarda los datos del usuario en el request
        req.usuario = {
            id: payload.sub,
            username: payload.username,
            email: payload.email,
            rol: payload.rol
        };
        next(); // Continúa con la siguiente función
    }
    catch(ex){
        res.status(401).send({ message: 'Token inválido'});
    }
}

module.exports = { createToken, validateToken, validateAdmin };
