const router = require('express').Router();
const { body } = require('express-validator');
const auth = require('../controllers/authController');
const protect = require('../middleware/auth');
const validate = require('../middleware/validate');

router.post('/register', [
  body('name').trim().isLength({ min: 2 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 })
], validate, auth.register);

router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], validate, auth.login);

router.get('/profile', protect, auth.profile);
router.put('/profile', protect, [body('name').optional().trim().isLength({ min: 2 })], validate, auth.updateProfile);

module.exports = router;
