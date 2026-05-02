module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    title: { type: DataTypes.STRING(180), allowNull: false },
    content: { type: DataTypes.TEXT('long'), allowNull: false, defaultValue: '' },
    tags: { type: DataTypes.JSON, allowNull: true }
  }, {
    indexes: [{ fields: ['userId'] }, { fields: ['title'] }]
  });

  Note.associate = (models) => Note.belongsTo(models.User, { foreignKey: 'userId' });
  return Note;
};
