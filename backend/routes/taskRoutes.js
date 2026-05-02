const router = require('express').Router();
const { body } = require('express-validator');
const controller = require('../controllers/taskController');
const protect = require('../middleware/auth');
const validate = require('../middleware/validate');

router.use(protect);
router.get('/', controller.list);
router.post('/', [
  body('title').trim().isLength({ min: 1, max: 180 }),
  body('priority').optional().isIn(['low', 'medium', 'high'])
], validate, controller.create);
router.put('/:id', validate, controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
