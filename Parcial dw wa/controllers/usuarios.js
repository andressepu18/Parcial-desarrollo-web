'use strict';

let Usuario = require('../models/usuarios');
let auth = require('../helpers/auth');
let bcrypt = require('bcryptjs');

// Función para registrar un nuevo usuario
function registrar(req, res){
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let rol = req.body.rol || 'standard'; // Por defecto el rol es 'standard'
    
    // Valida que se envíen los campos requeridos
    if(!username || !email || !password){
        return res.status(400).send({ message: 'Debe enviar username, email y password' });
    }
    
    // Valida que el rol sea válido
    if(rol !== 'admin' && rol !== 'standard'){
        return res.status(400).send({ message: 'El rol debe ser "admin" o "standard"' });
    }
    
    // Crea un nuevo usuario con los datos proporcionados
    let usuario = new Usuario({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, 10), // Hashea el password
        rol: rol  // Asigna el rol
    });
    
    // Guarda el usuario en la base de datos
    usuario.save().then(
        (usuarioCreado) => {
            res.status(200).send({ 
                message: 'Usuario registrado exitosamente',
                usuario: {
                    username: usuarioCreado.username,
                    email: usuarioCreado.email,
                    rol: usuarioCreado.rol
                } 
            });
        }
    ).catch(
        (err) => {
            res.status(500).send({ message: 'Error al registrar el usuario' });
        }
    );
}

// Función para hacer login y obtener el token
function login(req, res){
    let emailParametro = req.body.email;
    let passwordParametro = req.body.password;
    
    // Valida que se envíen email y password
    if(!emailParametro || !passwordParametro){
        return res.status(400).send({ message: 'Debe enviar email y password' });
    }
    
    // Busca el usuario por email
    Usuario.findOne({ email: emailParametro }).then(
        (usuario) => {
            // Valida que el usuario exista
            if(!usuario){
                return res.status(404).send({ message: 'No existe el usuario' });
            }
            
            // Compara la contraseña ingresada con la hasheada en la BD
            if(!bcrypt.compareSync(passwordParametro, usuario.password)){
                return res.status(401).send({ message: 'Contraseña incorrecta' });
            }
            
            // Si todo es correcto, genera el token JWT
            res.status(200).send({ 
                message: 'Login exitoso',
                token: auth.createToken(usuario),
                usuario: {
                    username: usuario.username,
                    email: usuario.email,
                    rol: usuario.rol
                }
            });
        }
    ).catch(
        (err) => {
            res.status(500).send({ message: 'Error al realizar el login' });
        }
    );
}

module.exports = { registrar, login };
