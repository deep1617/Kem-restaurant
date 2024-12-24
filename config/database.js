const mysql = require('mysql2');
require('dotenv').config();
const fs = require('fs');

// Creating a MySQL connection pool. This helps manage multiple database connections.
console.log(process.env.DB_HOST);
const pool = mysql.createPool({
    connectionLimit: 10, // the number of connections nodes can hold open with the database
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectTimeout: 20000,
    port: process.env.DB_PORT,
    ssl  : {
            ca : fs.readFileSync(__dirname + '/ca.pem')  // Path to your CA certificate file
        }
});

// Function to get the database connection
const getConnection = (callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error("Error connecting to the database: ", err);
            return callback(err, null);
        }
        callback(null, connection);
    });
};

// Export the getConnection function so it can be used in other parts of the application
module.exports = {getConnection};