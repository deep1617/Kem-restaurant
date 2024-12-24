const express = require('express');
const router = express.Router();
const RestaurantsController = require('../controllers/restaurantsController');

router.get('/', RestaurantsController.list);
router.post('/', RestaurantsController.create);
router.put('/:id', RestaurantsController.update);

module.exports = router;