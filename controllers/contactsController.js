const Contact = require('../models/contact');

const ContactsController = {
    listByRestaurant(req, res) {
        Contact.getAllByRestaurant(req.params.restaurantId, (data) => {
            res.json(data);
        });
    },
    create(req, res) {
        Contact.create(req.body, (insertId) => {
            res.status(201).send({ id: insertId });
        });
    }
};

module.exports = ContactsController;