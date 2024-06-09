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

function insertUser(email, password, firstName, lastName) {
  return new Promise((resolve, reject) => {                 
    const sql = "INSERT INTO person (email, password, first_name, last_name) VALUES (?, ?, ?, ?)";
    connection.query(sql, [email, password, firstName, lastName], (err, result) => {
      if (err) {
        console.error('Error during query execution: ' + err.stack);
        return reject(err);
      }
      if (result && result.serverStatus > 0) {
        console.log("Insert Confirmed: " + result.serverStatus);
        return resolve(true);
      }
      resolve(false);
    });
  });
}

function isUser(email, password) {

  const emailUser= email;
  const passwordUser = password;

  return new Promise((resolve, reject) => {
    const sql = 'SELECT email, password, first_name, last_name FROM person WHERE email = ?';
    connection.query(sql, [email], (err, result) => {
      if (err) {
        console.error('Error during query execution: ' + err.stack);
        return reject(err);
      }
      if (result && result.length > 0) {
        console.log("User Email:", result[0].email);
        console.log("User Password:", result[0].password);
        if(emailUser === result[0].email && result[0].password == passwordUser){
          console.log("Auther Confirnmd")
          return resolve(true);
        }
        return resolve(false);
      }
      console.log("User not found");
      resolve(false);
    });
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
  insertUser,
  closeConnection,
  isUser
};
