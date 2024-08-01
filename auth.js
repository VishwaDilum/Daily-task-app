const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRETKEY = process.env.SECRET_KEY;
function generateToken(email, validation) {
  const token = jwt.sign({ email, validation }, SECRETKEY, { expiresIn: '1h' }); // Adjust expiration time as needed
  return token;
}
function tokenValidation(token) {
  const decoded = jwt.decode(token, { complete: true });

  if (decoded && decoded.payload && decoded.payload.exp) {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const expiration = decoded.payload.exp;

    if (now > expiration) {
      console.log('Token has expired.');
      return false;
    } else {
      console.log('Token is still valid.');
      return true;
    }
  } else {
    console.log('Token does not contain an expiration claim.');
    return false;
  }
}

module.exports = {
  generateToken,
  tokenValidation
};
