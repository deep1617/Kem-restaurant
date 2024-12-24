const express = require('express');
const router = express.Router();
const InteractionsController = require('../controllers/interactionsController');

router.get('/:restaurantId', InteractionsController.listByRestaurant);
router.post('/', InteractionsController.create);

module.exports = router;