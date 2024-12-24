const db = require('../config/database');

const Contact = {
    getAllByRestaurant(restaurantId, callback) {
        const sql = 'SELECT * FROM contacts WHERE restaurant_id = ?';
        db.getConnection((err, connection) => {
            if (err) {
                console.error("Failed to get database connection: ", err);
                callback(err, null);
                return;
            }
            connection.query(sql, [restaurantId], (error, results) => {
                // Always release the connection back to the pool
                connection.release();
                if (error) {
                    console.error("Error executing query: ", error);
                    callback(error, null);
                    return;
                }
                callback(results);
            });
        });
    },
    create(data, callback) {
        const sql = 'INSERT INTO contacts (restaurant_id, name, role, phone_number, email) VALUES (?, ?, ?, ?, ?)';
        db.getConnection((err, connection) => {
            if (err) {
                console.error("Failed to get database connection: ", err);
                callback(err, null);
                return;
            }
            connection.query(sql, [data.restaurant_id, data.name, data.role, data.phone_number, data.email], (error, results) => {
                // Always release the connection back to the pool
                connection.release();
                if (error) {
                    console.error("Error executing query: ", error);
                    callback(error, null);
                    return;
                }
                callback(results.insertId);
            });
        });
    }
};

module.exports = Contact;