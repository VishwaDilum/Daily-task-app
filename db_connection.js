require('dotenv').config();
var mysql      = require('mysql2');
var connection = mysql.createConnection({
  host     : process.env.HOST_NAME,
  user     : process.env.USER_NAME,
  password : process.env.PASSWORD
});
connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});

// connection.end();
module.exports = connection;