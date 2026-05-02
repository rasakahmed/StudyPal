const router = require('express').Router();
const { body } = require('express-validator');
const controller = require('../controllers/financeController');
const protect = require('../middleware/auth');
const validate = require('../middleware/validate');

router.use(protect);
router.get('/', controller.list);
router.get('/analytics', controller.analytics);
router.post('/', [
  body('amount').isFloat({ min: 0.01 }),
  body('category').trim().notEmpty(),
  body('date').isISO8601()
], validate, controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
