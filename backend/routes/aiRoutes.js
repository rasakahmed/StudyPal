const router = require('express').Router();
const { body } = require('express-validator');
const controller = require('../controllers/aiController');
const protect = require('../middleware/auth');
const validate = require('../middleware/validate');
const { aiLimiter } = require('../middleware/rateLimiters');

router.use(protect, aiLimiter);
router.post('/chat', [body('messages').isArray()], validate, controller.chat);
router.post('/productivity', controller.productivity);

module.exports = router;
