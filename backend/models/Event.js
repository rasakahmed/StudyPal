module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    title: { type: DataTypes.STRING(180), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    date: { type: DataTypes.DATE, allowNull: false },
    category: { type: DataTypes.ENUM('deadline', 'assignment', 'event', 'study'), defaultValue: 'event' }
  }, {
    indexes: [{ fields: ['userId', 'date'] }]
  });

  Event.associate = (models) => Event.belongsTo(models.User, { foreignKey: 'userId' });
  return Event;
};
