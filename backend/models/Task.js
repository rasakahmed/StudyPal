module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    title: { type: DataTypes.STRING(180), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    dueDate: { type: DataTypes.DATE, allowNull: true },
    priority: { type: DataTypes.ENUM('low', 'medium', 'high'), defaultValue: 'medium' },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    category: { type: DataTypes.STRING(80), allowNull: true }
  }, {
    indexes: [{ fields: ['userId', 'completed'] }, { fields: ['dueDate'] }]
  });

  Task.associate = (models) => Task.belongsTo(models.User, { foreignKey: 'userId' });
  return Task;
};
