module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      userId: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'Users', key: 'id' }, onDelete: 'CASCADE' },
      title: { type: Sequelize.STRING(180), allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      dueDate: { type: Sequelize.DATE, allowNull: true },
      priority: { type: Sequelize.ENUM('low', 'medium', 'high'), defaultValue: 'medium' },
      completed: { type: Sequelize.BOOLEAN, defaultValue: false },
      category: { type: Sequelize.STRING(80), allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.addIndex('Tasks', ['userId', 'completed']);
    await queryInterface.addIndex('Tasks', ['dueDate']);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Tasks');
  }
};
