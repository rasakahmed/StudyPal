module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(120), allowNull: false },
    email: { type: DataTypes.STRING(180), allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false },
    preferences: { type: DataTypes.JSON, allowNull: true }
  }, {
    indexes: [{ unique: true, fields: ['email'] }]
  });

  User.associate = (models) => {
    User.hasMany(models.Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(models.Note, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(models.Event, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(models.Expense, { foreignKey: 'userId', onDelete: 'CASCADE' });
    User.hasMany(models.Habit, { foreignKey: 'userId', onDelete: 'CASCADE' });
  };

  return User;
};
