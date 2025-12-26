const User = require('../models/userModel');
const bcrypt = require('bcryptjs')


exports.getAll = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};


exports.getOne = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    res.json(user);
}

exports.create = async (req, res) => {
    const { username, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role
    });

    res.json(user);
};

exports.update = async (req,res) => {
    try{
        const { _id, ...updateData } = req.body;
                console.log('➡️ UPDATE DATA =', updateData);
        
                const user = await User.findByIdAndUpdate(
                req.params.id,
                { $set: updateData },
                { new: true, runValidators: true }
                );
        
                res.json(user);
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    } 
}

exports.remove = async (req,res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Utilisateur suppirmé'})
}

