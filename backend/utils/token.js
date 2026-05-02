const jwt = require('jsonwebtoken');

const signToken = (user) => jwt.sign(
  { id: user.id, email: user.email },
  process.env.JWT_SECRET || 'studypal-dev-secret',
  { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
);

module.exports = signToken;
