// server.js
const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./routes/countryRoutes');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/usuarios', usuarioRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
    res.send('API de Usuarios funcionando correctamente');
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});