const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const db = require('./control/conexion');
const rutas = require('./control/rutas'); // Asegúrate de que 'rutas.js' contiene las rutas del producto y demás


const app = express();
const PORT = 3000;

// Middleware para analizar los cuerpos de las solicitudes (req.body)
app.use(bodyParser.json());

// Middleware para manejar archivos subidos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas para manejar los productos
app.use('/api', rutas);  // Usar las rutas definidas en el archivo 'rutas.js'

// Servir la carpeta 'uploads' como estática
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

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
