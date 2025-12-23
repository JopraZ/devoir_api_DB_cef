// Import de Mongoose pour se connecter à MongoDB
const mongoose = require('mongoose');

// Import du module fs pour lire les fichiers JSON
const fs = require('fs');

// Import de bcryptjs pour hasher les mots de passe
const bcrypt = require('bcryptjs');

// Import du modèle User
const User = require('./models/userModel');

// Connexion à MongoDB Atlas
mongoose
    .connect('mongodb+srv://louisdemol9_db_user:xerNzZBOR31jg2qB@essai.um9bwcc.mongodb.net/?appName=essai')
    .then(async () => {
        console.log('MongoDB connecté pour le seed');

        // Lecture du fichier JSON contenant les utilisateurs
        const users = JSON.parse(
        fs.readFileSync('./datas/user.json', 'utf-8')
        );

        // Suppression des utilisateurs existants
        await User.deleteMany({});

        // Hashage des mots de passe avant insertion
        for (let user of users) {
        user.password = await bcrypt.hash(user.password, 10);
        }

        // Insertion des utilisateurs dans MongoDB
        await User.insertMany(users);

        console.log('Données insérées avec succès');

        // Arrêt du script une fois le seed terminé
        process.exit();
    })
    .catch((err) => {
        // Gestion des erreurs lors du seed
        console.error('Erreur lors du seed de la base de données', err);
        process.exit(1);
    });
