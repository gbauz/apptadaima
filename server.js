const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./control/conexion');
const rutas = require('./control/rutas'); // Importamos las rutas

const app = express();
const PORT = 3000;

// Middleware para analizar los cuerpos de las solicitudes (req.body)
app.use(bodyParser.json());

// Servir la carpeta 'uploads' como estática
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Rutas de la API
app.get('/api/message', (req, res) => {
    res.json({ message: 'Hola desde el backend de Express!' });
});

// Usar las rutas definidas en 'rutas.js'
app.use('/api', rutas);

// Middleware para servir archivos estáticos del frontend de React (suponiendo que la carpeta 'client/dist' tiene los archivos de React)
app.use(express.static(path.join(process.cwd(), 'client/dist')));

// Manejar todas las demás rutas para el SPA (Single Page Application) de React
app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'client/dist', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});
