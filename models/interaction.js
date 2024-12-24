const db = require('../config/database');

const Interaction = {
    getAllByRestaurant(restaurantId, callback) {
        const sql = 'SELECT * FROM interactions WHERE restaurant_id = ?';
        db.getConnection((err, connection) => {
            if (err) {
                console.error("Failed to get database connection: ", err);
                callback(err, null);
                return;
            }
            connection.query(sql, [restaurantId], (error, results) => {
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
        const sql = 'INSERT INTO interactions (restaurant_id, date_of_interaction, type, notes, follow_up_required) VALUES (?, ?, ?, ?, ?)';
        db.getConnection((err, connection) => {
            if (err) {
                console.error("Failed to get database connection: ", err);
                callback(err, null);
                return;
            }
            connection.query(sql, [data.restaurant_id, data.date_of_interaction, data.type, data.notes, data.follow_up_required], (error, results) => {
                connection.release();
                if (error) {
                    console.error("Error executing query: ", error);
                    callback(error, null);
                    return;
                }
                callback(results.insertId);
            });
        });
    },
    getTodaysCalls(today, callback) {
        const sql = 'SELECT * FROM interactions WHERE date_of_interaction = ? AND follow_up_required = 1';
        db.getConnection((err, connection) => {
            if (err) {
                console.error("Failed to get database connection: ", err);
                callback(err, null);
                return;
            }
            connection.query(sql, [today], (error, results) => {
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
    getRecentInteractions(callback) {
        const sql = 'SELECT * FROM interactions WHERE date_of_interaction >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) ORDER BY date_of_interaction DESC';
        db.getConnection((err, connection) => {
            if (err) {
                console.error("Failed to get database connection: ", err);
                callback(err, null);
                return;
            }
            connection.query(sql, (error, results) => {
                connection.release();
                if (error) {
                    console.error("Error executing query: ", error);
                    callback(error, null);
                    return;
                }
                callback(results);
            });
        });
    }
};

module.exports = Interaction;