const db = require('../config/database');

const Kam = {
    getAll(callback) {
        db.getConnection((err, connection) => {
            if (err) {
                console.error("Failed to get database connection: ", err);
                callback(err, null);
                return;
            }
            connection.query('SELECT * FROM kams', (error, results) => {
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
        const sql = 'INSERT INTO kams (name) VALUES (?)';
        db.getConnection((err, connection) => {
            if (err) {
                console.error("Failed to get database connection: ", err);
                callback(err, null);
                return;
            }
            connection.query(sql, [data.name], (error, results) => {
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

module.exports = Kam;