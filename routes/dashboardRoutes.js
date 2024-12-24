const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboardController');

router.get('/leads', DashboardController.getAllLeads);
router.get('/today-calls', DashboardController.getTodaysCalls);
router.get('/recent-interactions', DashboardController.getRecentInteractions);
router.get('/search', DashboardController.searchLeads);

module.exports = router;