const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./conexion');
const router = express.Router();

// Ruta de inicio de sesión
router.post('/login', (req, res) => {
    const { correo, contraseña } = req.body;

    db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en el servidor' });
        if (results.length === 0) return res.status(401).json({ error: 'Credenciales inválidas' });

        const user = results[0];

        // Comparar contraseñas directamente (solo para pruebas, idealmente usar un hash)
        if (user.contraseña !== contraseña) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: user.id, rol_id: user.rol_id }, 'secretKey', { expiresIn: '1h' });

        res.json({ message: 'Inicio de sesión exitoso', token, rol_id: user.rol_id });
    });
});

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']; // Se espera que el token esté en el header Authorization como Bearer <token>
    if (!token) return res.status(403).json({ error: 'Token requerido' });

    const tokenWithoutBearer = token.split(' ')[1]; // Obtener el token sin el prefijo "Bearer"

    jwt.verify(tokenWithoutBearer, 'secretKey', (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token inválido' });

        req.user = decoded; // Almacenar la información del usuario decodificada del token
        next();
    });
};

// Middleware para autorizar roles
const authorizeRole = (allowedRoles) => (req, res, next) => {
    const { rol_id } = req.user;
    if (!allowedRoles.includes(rol_id)) {
        return res.status(403).json({ error: 'No tienes permisos para esta acción' });
    }
    next();
};

// Ruta para registrar proveedores (acceso solo para empleados)
router.post('/registrar-proveedor', verifyToken, authorizeRole([2]), (req, res) => {
    res.json({ message: 'Proveedor registrado correctamente' });
});

// Ruta para acciones de administrador (acceso solo para admins)
router.get('/admin-options', verifyToken, authorizeRole([1]), (req, res) => {
    res.json({ message: 'Opciones de administrador disponibles' });
});

// Ruta para actualizar la imagen de perfil
router.post('/actualizar-imagen', verifyToken, (req, res) => {
    const userId = req.user.id;
    const imagen = req.files.imagen; // Asumiendo que usas 'express-fileupload' o un middleware similar

    // Subir imagen y actualizar en la base de datos (o guardar solo la URL si prefieres)
    const imagePath = '/ruta/a/tu/carpeta/imagenes/' + imagen.name;

    db.query('UPDATE usuarios SET imagen = ? WHERE id = ?', [imagePath, userId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar la imagen' });

        // Guardar la imagen en el servidor (reemplaza con tu propia lógica)
        imagen.mv('./uploads/' + imagen.name, (err) => {
            if (err) return res.status(500).json({ error: 'Error al guardar la imagen' });

            res.json({ message: 'Imagen actualizada correctamente' });
        });
    });
});

// Ruta para obtener los datos del usuario autenticado
router.get('/user-data', verifyToken, (req, res) => {
    const userId = req.user.id; // El ID del usuario está en el token
    db.query('SELECT id, nombre, correo, rol_id FROM usuarios WHERE id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en el servidor' });
        if (results.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

        const user = results[0];
        res.json({ nombre: user.nombre, correo: user.correo, rol_id: user.rol_id });
    });
});

module.exports = router;
