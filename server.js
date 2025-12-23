// Import d’Express (framework pour créer l’API)
const express = require('express');
const app = express();

// Connexion à MongoDB
const connectDB = require('./config/db');
connectDB();

// Middleware pour lire le JSON envoyé par le client
app.use(express.json());

// Routes d’authentification (login)
const authRoutes = require('./router/authRoutes');
app.use('/api', authRoutes);

const catwayRoute = require('./router/catwayRoutes');
app.use('/catways', catwayRoute);

const reservationRoutes = require('./router/reservationRoutes');
app.use('/reservations', reservationRoutes);

// Lancement du serveur
app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});
