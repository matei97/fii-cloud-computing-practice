const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  database: 'Clouding'
});

// Export a function that executes a query
module.exports.query = function(sql, values, callback) {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) 
    
    { 
      console.log(err)

      return callback(err);
    }
    // Use the connection to execute the query
    connection.query(sql, values, (err, rows) => {
      connection.release(); // Release the connection back to the pool

      if (err) return callback(err);

      // Return the rows as the result of the callback
      callback(null, rows);
    });
  });
};