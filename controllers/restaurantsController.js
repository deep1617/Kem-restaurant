const Restaurant = require('../models/restaurant');

const RestaurantsController = {
    list(req, res) {
        Restaurant.getAll((data) => {
            res.json(data);
        });
    },
    create(req, res) {
        Restaurant.create(req.body, (insertId) => {
            res.status(201).send({ id: insertId });
        });
    },
    update(req, res) {
            const { id } = req.params;
            Restaurant.update(id, req.body, (result) => {
                console.log(result);
                if (result?.affectedRows > 0) {
                    res.status(200).send({ message: 'Restaurant updated successfully.' });
                } else {
                    res.status(404).send({ message: 'Restaurant not found.' });
                }
            });
        }
};

module.exports = RestaurantsController;
