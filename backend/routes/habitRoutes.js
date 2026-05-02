const router = require('express').Router();
const { body } = require('express-validator');
const controller = require('../controllers/habitController');
const protect = require('../middleware/auth');
const validate = require('../middleware/validate');

router.use(protect);
router.get('/', controller.list);
router.post('/', [
  body('waterIntake').optional().isInt({ min: 0 }),
  body('sleepHours').optional().isFloat({ min: 0, max: 24 }),
  body('studyHours').optional().isFloat({ min: 0, max: 24 })
], validate, controller.upsert);
router.delete('/:id', controller.remove);

module.exports = router;
