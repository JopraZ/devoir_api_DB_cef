const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://louisdemol9_db_user:xerNzZBOR31jg2qB@essai.um9bwcc.mongodb.net/?appName=essai')
        console.log('MongoDB connecté');
    } catch (err) {
        console.error('Erreur de connexion à MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB;