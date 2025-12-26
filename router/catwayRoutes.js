const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const catwayController = require('../controllers/catwayController');

router.get('/:catwayNumber/reservations', auth, catwayController.getReservations);
router.get('/', auth, catwayController.getAll);
router.get('/:id', auth, catwayController.getOne);
router.post('/', auth, catwayController.create);
router.put('/:id', auth, catwayController.update);
router.delete('/:id', auth, catwayController.remove);

module.exports = router;
