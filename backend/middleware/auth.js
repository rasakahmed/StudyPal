const jwt = require('jsonwebtoken');
const { User } = require('../models');
const ApiError = require('../utils/apiError');

const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw new ApiError(401, 'Authentication token required');

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'studypal-dev-secret');
    const user = await User.findByPk(decoded.id, { attributes: { exclude: ['password'] } });
    if (!user) throw new ApiError(401, 'User no longer exists');

    req.user = user;
    next();
  } catch (error) {
    next(error.name === 'JsonWebTokenError' ? new ApiError(401, 'Invalid token') : error);
  }
};

module.exports = protect;