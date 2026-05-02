const router = require('express').Router();
const { body } = require('express-validator');
const controller = require('../controllers/notesController');
const protect = require('../middleware/auth');
const validate = require('../middleware/validate');

router.use(protect);
router.get('/', controller.list);
router.post('/', [body('title').trim().notEmpty()], validate, controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.post('/ai/summary', [body('content').isString()], validate, controller.summarize);
router.post('/ai/flashcards', [body('content').isString()], validate, controller.flashcards);

module.exports = router;
