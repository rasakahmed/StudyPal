const router = require('express').Router();
const { body } = require('express-validator');
const controller = require('../controllers/calendarController');
const protect = require('../middleware/auth');
const validate = require('../middleware/validate');

router.use(protect);
router.get('/', controller.list);
router.post('/', [
  body('title').trim().notEmpty(),
  body('date').isISO8601(),
  body('category').optional().isIn(['deadline', 'assignment', 'event', 'study'])
], validate, controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
