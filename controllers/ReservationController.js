const Catway = require('../models/catwayModel');
const Reservation = require('../models/reservationModel');

exports.getAll = async (req, res) => {
    const reservations = await Reservation.find();
    res.json(reservations);
};

exports.getOne = async (req, res) => {
    const reservation = await Reservation.findById(req.params.id);
    res.json(reservation);
}

exports.create = async (req, res) => {

    const { catwayNumber } = req.body;
    const catway = await Catway.findOne({ catwayNumber });

    if (!catway) {
        return res.status(404).json({ message: 'Catway not found' });
    }

    const reservation = await Reservation.create(req.body);

    await catway.save();
    res.status(201).json(reservation);
}

exports.update = async (req, res) => {

    try {

        const { _id, ...updateData } = req.body;
        console.log('➡️ UPDATE DATA =', updateData);

        const reservation = await Reservation.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true, runValidators: true }
        );

        res.json(reservation);
        console.log('✅ RÉSERVATION APRÈS UPDATE =', reservation);


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};


exports.remove = async (req, res) => {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reservation supprimée' });
}