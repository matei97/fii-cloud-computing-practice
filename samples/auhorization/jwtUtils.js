const jwt = require('jsonwebtoken');

let SECRET_KEY = 'my-secret-key';

function generateJWT(username, firstName, lastName, group) {
  const claims = {
    username,
    firstName,
    lastName,
    group
  };

  return jwt.sign(claims, SECRET_KEY, {
    expiresIn: '1h' // expires in 1 hour
  });
}

function verify(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = {
  generateJWT, verify
};

