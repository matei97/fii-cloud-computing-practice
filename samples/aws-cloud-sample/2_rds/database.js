const mysql = require('mysql2');
let dbConfig = require('./db_config')

// Create a connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: dbConfig.instance_name,
    user: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database_name
});

// Export a function that executes a query
module.exports.query = function (sql, values, callback) {
    // Get a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            return callback(err);
        }
        // Use the connection to execute the query
        connection.query(sql, values, (err, rows) => {
            connection.release(); // Release the connection back to the pool
            if (err) {
                return callback(err);
            }
            // Return the rows as the result of the callback
            callback(null, rows);
        });
    });
};

module.exports.pool = pool;