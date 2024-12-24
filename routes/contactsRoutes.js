const express = require('express');
const router = express.Router();
const ContactsController = require('../controllers/contactsController');

router.get('/:restaurantId', ContactsController.listByRestaurant);
router.post('/', ContactsController.create);

module.exports = router;