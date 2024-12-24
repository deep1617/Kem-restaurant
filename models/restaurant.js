const db = require('../config/database');

const Restaurant = {
    getAll(callback) {
        db.getConnection((err, connection) => {
            if (err) {
                console.error("Failed to get database connection: ", err);
                callback(err, null);
                return;
            }
            connection.query('SELECT * FROM restaurants', (error, results) => {
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
        const sql = 'INSERT INTO restaurants (name, address, contact_number, current_status, assigned_kam_id) VALUES (?, ?, ?, ?, ?)';
        db.getConnection((err, connection) => {
            if (err) {
                console.error("Failed to get database connection: ", err);
                callback(err, null);
                return;
            }
            connection.query(sql, [data.name, data.address, data.contact_number, data.current_status, data.assigned_kam_id], (error, results) => {
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
    update(id, data, callback) {
        console.log("hello");
        const sql = 'UPDATE restaurants SET name = ?, address = ?, contact_number = ?, current_status = ?, assigned_kam_id = ? WHERE id = ?';
        db.getConnection((err, connection) => {
            if (err) {
                console.error("Failed to get database connection: ", err);
                callback(err, null);
                return;
            }
            connection.query(sql, [data.name, data.address, data.contact_number, data.current_status, data.assigned_kam_id, id], (error, results) => {
                connection.release();
                if (error) {
                    console.error("Error executing query: ", error);
                    callback(error, null);
                    return;
                }
                console.log(results);
                callback(results);
            });
        });
    },
    getAllLeads(callback) {
        const sql = 'SELECT restaurants.*, kams.name as kam_name FROM restaurants JOIN kams ON restaurants.assigned_kam_id = kams.id';
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
    },
    searchLeads(query, callback) {
        const sql = 'SELECT restaurants.*, kams.name as kam_name FROM restaurants JOIN kams ON restaurants.assigned_kam_id = kams.id WHERE restaurants.name LIKE ? OR restaurants.address LIKE ? OR kams.name LIKE ?';
        const searchQuery = `%${query}%`;
        db.getConnection((err, connection) => {
            if (err) {
                console.error("Failed to get database connection: ", err);
                callback(err, null);
                return;
            }
            connection.query(sql, [searchQuery, searchQuery, searchQuery], (error, results) => {
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

module.exports = Restaurant;