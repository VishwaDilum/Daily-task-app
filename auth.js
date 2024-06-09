const jwt = require('jsonwebtoken');

function generateToken(email) {
  return jwt.sign({ email }, 'your_secret_key', { expiresIn: '1h' }); // Adjust expiration time as needed
}

module.exports = {
  generateToken
};
