module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Habits', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      userId: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'Users', key: 'id' }, onDelete: 'CASCADE' },
      waterIntake: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0 },
      sleepHours: { type: Sequelize.DECIMAL(4, 1), defaultValue: 0 },
      studyHours: { type: Sequelize.DECIMAL(4, 1), defaultValue: 0 },
      workout: { type: Sequelize.BOOLEAN, defaultValue: false },
      streak: { type: Sequelize.INTEGER.UNSIGNED, defaultValue: 0 },
      date: { type: Sequelize.DATEONLY, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.addIndex('Habits', ['userId', 'date'], { unique: true });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Habits');
  }
};
