const { Op, fn, col, literal } = require('sequelize');
const { Expense, sequelize } = require('../models');

exports.list = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll({ where: { userId: req.user.id }, order: [['date', 'DESC']] });
    res.json({ expenses });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const expense = await Expense.create({ ...req.body, userId: req.user.id });
    res.status(201).json({ expense });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const expense = await Expense.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    await expense.update(req.body);
    res.json({ expense });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await Expense.destroy({ where: { id: req.params.id, userId: req.user.id } });
    if (!deleted) return res.status(404).json({ message: 'Expense not found' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.analytics = async (req, res, next) => {
  try {
    const year = Number(req.query.year || new Date().getFullYear());
    const start = `${year}-01-01`;
    const end = `${year}-12-31`;

    if (sequelize.getDialect() === 'sqlite') {
      const expenses = await Expense.findAll({
        where: { userId: req.user.id, date: { [Op.between]: [start, end] } },
        order: [['date', 'ASC']]
      });

      const monthlyMap = new Map();
      const categoryMap = new Map();

      expenses.forEach((expense) => {
        const plain = expense.toJSON();
        const month = Number(String(plain.date).slice(5, 7));
        const amount = Number(plain.amount || 0);

        monthlyMap.set(month, (monthlyMap.get(month) || 0) + amount);
        categoryMap.set(plain.category, (categoryMap.get(plain.category) || 0) + amount);
      });

      const monthly = Array.from(monthlyMap.entries())
        .sort(([a], [b]) => a - b)
        .map(([month, total]) => ({ month, total }));

      const categories = Array.from(categoryMap.entries())
        .map(([category, total]) => ({ category, total }));

      return res.json({ monthly, categories });
    }

    const monthly = await Expense.findAll({
      where: { userId: req.user.id, date: { [Op.between]: [start, end] } },
      attributes: [[literal('MONTH(date)'), 'month'], [fn('SUM', col('amount')), 'total']],
      group: [literal('MONTH(date)')],
      order: [[literal('MONTH(date)'), 'ASC']]
    });
    const categories = await Expense.findAll({
      where: { userId: req.user.id, date: { [Op.between]: [start, end] } },
      attributes: ['category', [fn('SUM', col('amount')), 'total']],
      group: ['category']
    });
    res.json({ monthly, categories });
  } catch (error) {
    next(error);
  }
};
