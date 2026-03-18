'use strict';

let Producto = require('../models/productos');

// Función para crear un nuevo producto (solo administradores)
function crearProducto(req, resp){
    let requestBody = req.body;

    // Valida que se envíe un body
    if(!requestBody){
        resp.status(400).send({'message': 'No se envió información en el request'});
    }
    // Valida que se envíen los campos obligatorios
    else if(!requestBody.titulo || !requestBody.descripcion || !requestBody.precio){
        resp.status(400).send({'message': 'Falta información: necesita titulo, descripcion y precio'});
    }
    // Valida que los valores sean válidos
    else if(requestBody.titulo.trim() === '' || requestBody.descripcion.trim() === '' || requestBody.precio <= 0){
        resp.status(400).send({'message': 'El titulo, descripcion no pueden estar vacíos y el precio debe ser mayor a 0'});
    }
    else{
        // Crea un nuevo producto
        let nuevoProducto = new Producto();
        nuevoProducto.titulo = requestBody.titulo;
        nuevoProducto.descripcion = requestBody.descripcion;
        nuevoProducto.precio = requestBody.precio;
        nuevoProducto.creadoPor = req.usuario.id; // Guarda el ID del usuario que lo creó
        nuevoProducto.fechaCreacion = new Date(); // Guarda la fecha actual

        // Guarda el producto en la base de datos
        nuevoProducto.save().then(
            (productoCreado) => {
                resp.status(201).send({
                    'message': 'Producto creado exitosamente',
                    'producto': productoCreado
                });
            },
            err => {
                resp.status(500).send({'message':'Error interno al crear el producto', 'error': err});
            }
        );
    }
}

// Función para consultar todos los productos (cualquier usuario autenticado)
function consultarTodos(req, resp){
    Producto.find({ }).then(
        (productos) => {
            resp.status(200).send({
                'message': 'Productos encontrados',
                'cantidad': productos.length,
                'productos': productos
            });
        }
    ).catch(
        (err) => {
            resp.status(500).send({ message: 'Error al consultar los productos' });
        }
    );
}

// Función para consultar un producto por ID (cualquier usuario autenticado)
function consultarPorId(req, resp){
    let productoId = req.params.productoId;
    
    Producto.findById(productoId).then(
        (producto) => {
            // Valida que el producto exista
            if(!producto){
                return resp.status(404).send({ message: 'Producto no encontrado' });
            }
            resp.status(200).send({
                'message': 'Producto encontrado',
                'producto': producto
            });
        }
    ).catch(
        (err) => {
            resp.status(500).send({ message: 'Error al consultar el producto' });
        }
    );
}

// Función para eliminar un producto (solo administradores)
function borrarPorId(req, resp){
    let productoId = req.params.productoId;
    
    Producto.findByIdAndDelete(productoId).then(
        (producto) => {
            resp.status(200).send({ 
                'message': 'Producto eliminado exitosamente',
                'producto': producto
            });
        }
    ).catch(
        (err) => {
            resp.status(500).send({ message: 'Error al eliminar el producto' });
        }
    );
}

// Función para actualizar un producto (solo administradores)
function actualizarProducto(req, resp){
    let productoId = req.params.productoId;
    let requestBody = req.body;

    // Valida que se envíe un body
    if(!requestBody){
        resp.status(400).send({'message': 'No se envió información en el request'});
    }
    // Valida que se envíen los campos obligatorios
    else if(!requestBody.titulo || !requestBody.descripcion || !requestBody.precio){
        resp.status(400).send({'message': 'Se necesita titulo, descripcion y precio'});
    }
    // Valida que los valores sean válidos
    else if(requestBody.titulo.trim() === '' || requestBody.descripcion.trim() === '' || requestBody.precio <= 0){
        resp.status(400).send({'message': 'El titulo, descripcion no pueden estar vacíos y el precio debe ser mayor a 0'});
    }
    else{
        // Actualiza el producto con los nuevos datos
        Producto.findByIdAndUpdate(productoId, 
            {   
                titulo: requestBody.titulo, 
                descripcion: requestBody.descripcion,
                precio: requestBody.precio
            },  
            { new: true } // Retorna el documento actualizado
        ).then(
            (producto) => {
                resp.status(200).send({ 
                    'message': 'Producto actualizado exitosamente',
                    'producto': producto 
                });
            }
        ).catch(
            (err) => {
                resp.status(500).send({ message: 'Error al actualizar el producto' });
            }
        );
    }
}

module.exports = { crearProducto, consultarTodos, consultarPorId, borrarPorId, actualizarProducto };
