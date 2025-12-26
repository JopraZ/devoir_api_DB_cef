const Catway = require('../models/catwayModel');
const Reservation = require('../models/reservationModel');

exports.getAll = async (req, res) => {
	const catways = await Catway.find();
	res.json(catways);
};

exports.getOne = async (req, res) => {
	const catway = await Catway.findById(req.params.id);
	res.json(catway);
};

exports.getReservations = async (req, res) => {

	try {
		const catwayNumber = Number(req.params.catwayNumber);

		const catway = await Catway.findOne({ catwayNumber });
		console.log('catway trouvé =', catway);

		if (!catway) {
		return res.status(404).json({ message: 'Catway introuvable' });
		}

		const reservations = await Reservation.find({ catwayNumber });
		console.log('reservations =', reservations);

		res.json(reservations);

	} catch (error) {
		res.status(500).json({ message: 'Erreur serveur' });
	}
};


// POST /catways
exports.create = async (req, res) => {
	console.log('REQ.BODY =', req.body);

	const catway = await Catway.create(req.body);
	res.status(201).json(catway);
};

// PUT /catways/:id
exports.update = async (req, res) => {
	const catway = await Catway.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true }
	);
	res.json(catway);
};

// DELETE /catways/:id
exports.remove = async (req, res) => {
	await Catway.findByIdAndDelete(req.params.id);
	res.json({ message: 'Catway supprimé' });
};
