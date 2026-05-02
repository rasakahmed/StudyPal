module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    category: { type: DataTypes.STRING(80), allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false }
  }, {
    indexes: [{ fields: ['userId', 'date'] }, { fields: ['category'] }]
  });

  Expense.associate = (models) => Expense.belongsTo(models.User, { foreignKey: 'userId' });
  return Expense;
};
