const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req,res) => {

    const {username,password} = req.body;

    try {

        const user = await User.findOne({username});
        if(!user) {
            return res.status(401).json({message: 'Utilisateur non trouvé'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({message: 'Mot de passe incorrect'});
        }

        const token  = jwt.sign(
            {userId: user._id,
            username: user.username,
            email: user.email,
            role: user.role},
            'SECRET_KEY',
            {expiresIn: '2h'}
        )

        res.json({token});

    } catch(err) {
        console.error(err);
        res.status(500).json({message: 'Erreur serveur'});
    }

};