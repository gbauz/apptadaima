const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const db = require('./conexion');
const router = express.Router();

// 🔹 Middleware para verificar token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'Token requerido' });

    const tokenWithoutBearer = token.split(' ')[1];

    jwt.verify(tokenWithoutBearer, 'secretKey', (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Token inválido' });

        req.user = decoded;
        next();
    });
};

// 🔹 Middleware para verificar roles
const authorizeRole = (allowedRoles) => (req, res, next) => {
    if (!allowedRoles.includes(req.user.rol_id)) {
        return res.status(403).json({ error: 'No tienes permisos para esta acción' });
    }
    next();
};

// 🔹 Ruta de Login
router.post('/login', (req, res) => {
    const { correo, contraseña } = req.body;

    db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en el servidor' });
        if (results.length === 0) return res.status(401).json({ error: 'Credenciales inválidas' });

        const user = results[0];

        // Comparación de contraseñas en texto plano
        if (user.contraseña !== contraseña) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: user.id, rol_id: user.rol_id }, 'secretKey', { expiresIn: '1h' });

        res.json({ message: 'Inicio de sesión exitoso', token, rol_id: user.rol_id });
    });
});

// 🔹 Ruta para obtener datos del usuario autenticado
router.get('/user-data', verifyToken, (req, res) => {
    const userId = req.user.id;

    db.query('SELECT id, nombre, correo, rol_id, imagen FROM usuarios WHERE id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en el servidor' });
        if (results.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.json(results[0]);
    });
});

// 🔹 Ruta para actualizar datos del usuario
router.put('/update-user', verifyToken, (req, res) => {
    const { nombre, correo, contraseña, rol, imagen } = req.body;
    const userId = req.user.id;

    // Verificar si se pasó alguna nueva contraseña
    const updatedData = {};
    if (nombre) updatedData.nombre = nombre;
    if (correo) updatedData.correo = correo;
    if (contraseña) updatedData.contraseña = contraseña;
    if (rol) updatedData.rol_id = rol; // Si deseas cambiar el rol, puedes incluirlo aquí

    // Si hay imagen, manejarla por separado
    if (imagen) {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const uploadPath = path.join(uploadDir, imagen.name);
        imagen.mv(uploadPath, (err) => {
            if (err) return res.status(500).json({ error: 'Error al guardar la imagen' });

            const imagePathDB = '/uploads/' + imagen.name;
            updatedData.imagen = imagePathDB;

            // Realizar actualización en la base de datos
            db.query('UPDATE usuarios SET ? WHERE id = ?', [updatedData, userId], (err, results) => {
                if (err) return res.status(500).json({ error: 'Error al actualizar el usuario' });
                if (results.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

                res.json({ message: 'Usuario actualizado correctamente', updatedData });
            });
        });
    } else {
        // Si no hay imagen, solo actualizamos los datos
        db.query('UPDATE usuarios SET ? WHERE id = ?', [updatedData, userId], (err, results) => {
            if (err) return res.status(500).json({ error: 'Error al actualizar el usuario' });
            if (results.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

            res.json({ message: 'Usuario actualizado correctamente', updatedData });
        });
    }
});

// 🔹 Ruta para actualizar imagen de perfil
router.post('/actualizar-imagen', verifyToken, (req, res) => {
    if (!req.files || !req.files.imagen) {
        return res.status(400).json({ error: 'No se ha subido ninguna imagen' });
    }

    const imagen = req.files.imagen;
    const userId = req.user.id;

    // Crear la carpeta 'uploads' si no existe
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    const uploadPath = path.join(uploadDir, imagen.name);

    imagen.mv(uploadPath, (err) => {
        if (err) return res.status(500).json({ error: 'Error al guardar la imagen' });

        const imagePathDB = '/uploads/' + imagen.name;

        db.query('UPDATE usuarios SET imagen = ? WHERE id = ?', [imagePathDB, userId], (err, results) => {
            if (err) return res.status(500).json({ error: 'Error al actualizar la imagen en la BD' });
            if (results.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

            res.json({ message: 'Imagen actualizada correctamente', imagePath: imagePathDB });
        });
    });
});

// 🔹 Ruta para registrar proveedores (solo empleados)
router.post('/registrar-proveedor', verifyToken, authorizeRole([2]), (req, res) => {
    res.json({ message: 'Proveedor registrado correctamente' });
});

// 🔹 Ruta para acciones de administrador
router.get('/admin-options', verifyToken, authorizeRole([1]), (req, res) => {
    res.json({ message: 'Opciones de administrador disponibles' });
});

module.exports = router;
