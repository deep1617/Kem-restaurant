const express = require('express');
const router = express.Router();
const KamsController = require('../controllers/kamsController');

router.get('/', KamsController.list);
router.post('/', KamsController.create);

module.exports = router;