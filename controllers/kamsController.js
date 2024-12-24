const Kam = require('../models/kam');

const KamsController = {
    list(req, res) {
        Kam.getAll((data) => {
            res.json(data);
        });
    },
    create(req, res) {
        Kam.create(req.body, (insertId) => {
            res.status(201).send({ id: insertId });
        });
    }
};

module.exports = KamsController;