const { Op } = require('sequelize');
const { Note } = require('../models');
const { runPrompt } = require('../services/aiService');

exports.list = async (req, res, next) => {
  try {
    const { search } = req.query;
    const where = { userId: req.user.id };
    if (search) where[Op.or] = [
      { title: { [Op.like]: `%${search}%` } },
      { content: { [Op.like]: `%${search}%` } }
    ];
    const notes = await Note.findAll({ where, order: [['updatedAt', 'DESC']] });
    res.json({ notes });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const note = await Note.create({ ...req.body, userId: req.user.id });
    res.status(201).json({ note });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const note = await Note.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    await note.update(req.body);
    res.json({ note });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await Note.destroy({ where: { id: req.params.id, userId: req.user.id } });
    if (!deleted) return res.status(404).json({ message: 'Note not found' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.summarize = async (req, res, next) => {
  try {
    const result = await runPrompt([
      { role: 'system', content: 'Summarize student notes into concise study bullets and action items.' },
      { role: 'user', content: req.body.content || '' }
    ], 'Note summary');
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.flashcards = async (req, res, next) => {
  try {
    const result = await runPrompt([
      { role: 'system', content: 'Generate 8 flashcards as markdown with Q: and A: lines from the supplied notes.' },
      { role: 'user', content: req.body.content || '' }
    ], 'Flashcards');
    res.json(result);
  } catch (error) {
    next(error);
  }
};
