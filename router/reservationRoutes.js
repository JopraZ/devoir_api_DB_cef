const express = require('express');
const router = express.Router();    

const auth = require('../middleware/authMiddleware');
const reservationController = require('../controllers/ReservationController');

router.get('/', auth, reservationController.getAll);
router.get('/:id', auth, reservationController.getOne);
router.post('/', auth, reservationController.create);
router.put('/:id', auth, reservationController.update);
router.delete('/:id', auth, reservationController.remove);

module.exports = router;