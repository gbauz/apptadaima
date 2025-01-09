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
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'Token requerido' });

    jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token inválido' });

        req.user = decoded;
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

module.exports = router;
