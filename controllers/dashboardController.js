const Restaurant = require('../models/restaurant');
const Interaction = require('../models/interaction');

const DashboardController = {
    getAllLeads(req, res) {
        Restaurant.getAllLeads((err, results) => {
            if (err) {
                res.status(500).send({ error: 'Error fetching leads' });
                return;
            }
            res.json(results);
        });
    },
    getTodaysCalls(req, res) {
        const today = new Date().toISOString().slice(0, 10);  // Format YYYY-MM-DD
        Interaction.getTodaysCalls(today, (err, results) => {
            if (err) {
                res.status(500).send({ error: 'Error fetching today\'s calls' });
                return;
            }
            res.json(results);
        });
    },
    getRecentInteractions(req, res) {
        Interaction.getRecentInteractions((err, results) => {
            if (err) {
                res.status(500).send({ error: 'Error fetching recent interactions' });
                return;
            }
            res.json(results);
        });
    },
    searchLeads(req, res) {
        const { query } = req.query;
        Restaurant.searchLeads(query, (err, results) => {
            if (err) {
                res.status(500).send({ error: 'Error performing search' });
                return;
            }
            res.json(results);
        });
    }
};

module.exports = DashboardController;