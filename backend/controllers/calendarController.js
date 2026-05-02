const { Event } = require('../models');

exports.list = async (req, res, next) => {
  try {
    const events = await Event.findAll({ where: { userId: req.user.id }, order: [['date', 'ASC']] });
    res.json({ events });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const event = await Event.create({ ...req.body, userId: req.user.id });
    res.status(201).json({ event });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const event = await Event.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    await event.update(req.body);
    res.json({ event });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await Event.destroy({ where: { id: req.params.id, userId: req.user.id } });
    if (!deleted) return res.status(404).json({ message: 'Event not found' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
