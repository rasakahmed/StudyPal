module.exports = (sequelize, DataTypes) => {
  const Habit = sequelize.define('Habit', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    waterIntake: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
    sleepHours: { type: DataTypes.DECIMAL(4, 1), defaultValue: 0 },
    studyHours: { type: DataTypes.DECIMAL(4, 1), defaultValue: 0 },
    workout: { type: DataTypes.BOOLEAN, defaultValue: false },
    streak: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
    date: { type: DataTypes.DATEONLY, allowNull: false }
  }, {
    indexes: [{ unique: true, fields: ['userId', 'date'] }]
  });

  Habit.associate = (models) => Habit.belongsTo(models.User, { foreignKey: 'userId' });
  return Habit;
};
