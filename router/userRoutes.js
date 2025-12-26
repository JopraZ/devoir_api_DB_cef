const express = require('express');
const router =express.Router();

const auth = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.get('/', auth, userController.getAll);
router.get('/:id', auth, userController.getOne);
router.post('/', auth, userController.create);
router.put('/:id', auth, userController.update);
router.delete('/:id', auth, userController.remove)

module.exports = router;