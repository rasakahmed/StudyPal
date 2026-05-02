const { Op } = require('sequelize');
const { Task } = require('../models');

exports.list = async (req, res, next) => {
  try {
    const { completed, priority, search } = req.query;
    const where = { userId: req.user.id };
    if (completed !== undefined) where.completed = completed === 'true';
    if (priority) where.priority = priority;
    if (search) where.title = { [Op.like]: `%${search}%` };
    const tasks = await Task.findAll({ where, order: [['completed', 'ASC'], ['dueDate', 'ASC']] });
    res.json({ tasks });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, userId: req.user.id });
    res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await task.update(req.body);
    res.json({ task });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await Task.destroy({ where: { id: req.params.id, userId: req.user.id } });
    if (!deleted) return res.status(404).json({ message: 'Task not found' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
