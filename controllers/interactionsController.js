const Interaction = require('../models/interaction');

const InteractionsController = {
    listByRestaurant(req, res) {
        Interaction.getAllByRestaurant(req.params.restaurantId, (data) => {
            res.json(data);
        });
    },
    create(req, res) {
        Interaction.create(req.body, (insertId) => {
            res.status(201).send({ id: insertId });
        });
    }
};

module.exports = InteractionsController;