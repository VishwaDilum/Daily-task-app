require('dotenv').config();
var mysql = require('mysql2');

var connection = mysql.createConnection({
  host     : process.env.HOST_NAME,
  user     : process.env.USER_NAME,
  password : process.env.PASSWORD,
  database : process.env.DATABASE_NAME
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});

function insertCustomer(email, password, firstName, lastName, callback) {
  var sql = "INSERT INTO person (email, password, first_name, last_name) VALUES (?, ?, ?, ?)";
  connection.query(sql, [email, password, firstName, lastName], function(err, result) {
    if (typeof callback === 'function') {
      if (err) return callback(err);
      callback(null, result.insertId);
    } else {
      console.error('Callback is not a function');
    }
  });
}

function closeConnection() {
  connection.end(function(err) {
    if (err) {
      console.error('Disconnection error: ' + err.stack);
      return;
    }
    console.log('Connection closed');
  });
}

module.exports = {
  insertCustomer,
  closeConnection
};
