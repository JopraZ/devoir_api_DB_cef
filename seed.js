const mongoose = require('mongoose');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const User = require('./models/userModel');

mongoose.connect('mongodb+srv://louisdemol9_db_user:xerNzZBOR31jg2qB@essai.um9bwcc.mongodb.net/?appName=essai')
    .then(async () => {
        console.log('MongoDB connecté pour le seed');

        const users = JSON.parse(
            fs.readFileSync('./datas/user.json', 'utf-8')
        );

        await User.deleteMany({});

        for (let user of users) {
            user.password = await bcrypt.hash(user.password, 10);   
        }

        await User.insertMany(users);
        console.log('Données insérées avec succès');
        process.exit();

    })
    .catch((err) => {
        console.error('Erreur lors du seed de la base de données', err);
        process.exit(1);
    });