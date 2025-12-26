require('dotenv').config();
const mongoose = require('mongoose');

const fs = require('fs');
const path = require('path');

const bcrypt = require('bcryptjs');

const User = require('./models/userModel');
const Catway = require('./models/catwayModel');
const Reservation = require('./models/reservationModel');

mongoose.connect(process.env.MONGO_URI)
  	.then(async () => {
		console.log('MongoDB connecté pour le seed');
		console.log('Base utilisée :', mongoose.connection.name);

		const users = JSON.parse(
		fs.readFileSync(path.join(__dirname, 'datas/user.json'), 'utf-8')
		);

		const catways = JSON.parse(
		fs.readFileSync(path.join(__dirname, 'datas/catways.json'), 'utf-8')
		);

		const reservations = JSON.parse(
		fs.readFileSync(path.join(__dirname, 'datas/reservations.json'), 'utf-8')
		);

		await User.deleteMany({});
		await Catway.deleteMany({});
		await Reservation.deleteMany({});

		for (let user of users) {
		user.password = await bcrypt.hash(user.password, 10);
		}

		await User.insertMany(users);
		await Catway.insertMany(catways);
		await Reservation.insertMany(reservations);

		console.log('Seed terminé avec succès');
		console.log(`- ${users.length} utilisateurs`);
		console.log(`- ${catways.length} catways`);
		console.log(`- ${reservations.length} réservations`);

		process.exit();
	})
	.catch(err => {
		console.error('Erreur lors du seed', err);
		process.exit(1);
	});
