const bcrypt = require('bcryptjs');
const { User } = require('../models');
const ApiError = require('../utils/apiError');
const signToken = require('../utils/token');

const sanitizeUser = (user) => {
  const plain = user.toJSON();
  delete plain.password;
  return plain;
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) throw new ApiError(409, 'Email is already registered');

    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hash, preferences: { theme: 'light' } });
    res.status(201).json({ token: signToken(user), user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ApiError(401, 'Invalid email or password');
    }

    res.json({ token: signToken(user), user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
};

exports.profile = async (req, res) => {
  res.json({ user: req.user });
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, preferences } = req.body;
    await req.user.update({ name: name || req.user.name, preferences: preferences || req.user.preferences });
    res.json({ user: req.user });
  } catch (error) {
    next(error);
  }
};
