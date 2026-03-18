# Parcial Web - Backend API

Esta es la API del proyecto parcial desarrollada en **Node.js**, **Express** y **MongoDB**. Permite la gestión de usuarios (registro y login con JWT) y la gestión de productos (creación, lectura, actualización y eliminación con rutas protegidas por roles).

---

## Requisitos Previos

Asegúrate de tener instalado:

- **Node.js** versión 14 o superior
- **MongoDB** corriendo localmente en el puerto 27017 (por defecto)

---

## Instalación

## Instalación

1. Clona o descarga el repositorio en tu máquina local
2. Abre una terminal en la carpeta principal del proyecto (`carros/`) e instala las dependencias:

```bash
npm install
```

3. Verifica que MongoDB esté corriendo en tu máquina (puerto 27017)
4. Ejecuta el servidor:

```bash
node index.js
```

Deberías ver en consola:
```
Conexión a MongoDB exitosa
Servidor iniciado en puerto 1702
```

---

## Tecnologías Utilizadas

- **Express** - Framework web para Node.js
- **Mongoose** - ODM para modelado de datos con MongoDB
- **Bcryptjs** - Encriptación segura de contraseñas
- **JWT-Simple** - Generación y validación de tokens JWT
- **Body-Parser** - Parseo automático de JSON
- **Moment** - Manejo de fechas

---

## Estructura del Proyecto

```
Parcial dw wa/
├── models/           # Esquemas de la base de datos
│   ├── usuarios.js
│   └── productos.js
├── controllers/      # Lógica de negocio
│   ├── usuarios.js
│   └── productos.js
├── routes/           # Rutas del API
│   ├── users.js
│   └── productos.js
├── helpers/          # Funciones de autenticación
│   └── auth.js
├── application.js    # Configuración de Express
├── index.js          # Entrada principal
└── package.json
```

---

## Endpoints Principales

### Usuarios
- `POST /api/usuario/registrar` - Registrar nuevo usuario
- `POST /api/usuario/login` - Login y obtener token

### Productos
- `GET /api/productos` - Consultar todos los productos (requiere token)
- `GET /api/producto/:id` - Consultar un producto por ID (requiere token)
- `POST /api/producto` - Crear producto (requiere token de admin)
- `PUT /api/producto/:id` - Actualizar producto (requiere token de admin)
- `DELETE /api/producto/:id` - Eliminar producto (requiere token de admin)

---

## Modelo de Base de Datos

**Usuario:**
```javascript
{
  username: String,
  email: String,
  password: String,     // Hasheado con bcryptjs
  rol: String           // "admin" o "standard"
}
```

**Producto:**
```javascript
{
  titulo: String,
  descripcion: String,
  precio: Number,
  creadoPor: String,    // ID del usuario admin que lo creó
  fechaCreacion: Date
}
```

---

## Sistema de Autenticación

Los usuarios se autentican con JWT. Al hacer login, recibirán un token válido por 5 minutos que deberá incluirse en el header `Authorization: Bearer <token>` para acceder a las rutas protegidas.

---

## Autor Andrés Gómez Sepulveda
