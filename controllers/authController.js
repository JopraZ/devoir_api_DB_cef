const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req,res) => {

    const {username,password} = req.body;

    try {

        // Vérifie que l'utilisateur existe
        const user = await User.findOne({username});
        if(!user) {
            return res.status(401).json({message: 'Utilisateur non trouvé'});
        }

        // Vérifie le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({message: 'Mot de passe incorrect'});
        }

        // Génère un token JWT
        const token  = jwt.sign(
            {userId: user._id, role: user.role},
            'SECRET_KEY',
            {expiresIn: '2h'}
        )

        // Répond avec le token

        res.json({token});

    }

    catch(err) {
        console.error(err);
        res.status(500).json({message: 'Erreur serveur'});
    }

};