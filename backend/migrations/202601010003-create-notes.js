module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notes', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      userId: { type: Sequelize.INTEGER.UNSIGNED, allowNull: false, references: { model: 'Users', key: 'id' }, onDelete: 'CASCADE' },
      title: { type: Sequelize.STRING(180), allowNull: false },
      content: { type: Sequelize.TEXT('long'), allowNull: false },
      tags: { type: Sequelize.JSON, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.addIndex('Notes', ['userId']);
    await queryInterface.addIndex('Notes', ['title']);
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Notes');
  }
};
