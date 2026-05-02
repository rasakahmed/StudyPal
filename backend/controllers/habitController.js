const { Op } = require('sequelize');
const { Habit } = require('../models');

const computeStreak = async (userId, date) => {
  const entries = await Habit.findAll({
    where: { userId, date: { [Op.lte]: date } },
    order: [['date', 'DESC']]
  });
  let streak = 0;
  let cursor = new Date(`${date}T00:00:00`);
  for (const entry of entries) {
    const entryDate = new Date(`${entry.date}T00:00:00`);
    if (entryDate.toDateString() !== cursor.toDateString()) break;
    const healthyDay = Number(entry.studyHours) > 0 || Number(entry.waterIntake) >= 6 || entry.workout;
    if (!healthyDay) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
};

exports.list = async (req, res, next) => {
  try {
    const habits = await Habit.findAll({ where: { userId: req.user.id }, order: [['date', 'DESC']], limit: 60 });
    res.json({ habits });
  } catch (error) {
    next(error);
  }
};

exports.upsert = async (req, res, next) => {
  try {
    const date = req.body.date || new Date().toISOString().slice(0, 10);
    const [habit, created] = await Habit.findOrCreate({ where: { userId: req.user.id, date }, defaults: { ...req.body, userId: req.user.id, date } });
    if (!created) await habit.update(req.body);
    await habit.update({ streak: await computeStreak(req.user.id, date) });
    res.json({ habit });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await Habit.destroy({ where: { id: req.params.id, userId: req.user.id } });
    if (!deleted) return res.status(404).json({ message: 'Habit entry not found' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
