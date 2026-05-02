const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/db')[process.env.NODE_ENV || 'development'];

const sequelize = config.dialect === 'sqlite'
  ? new Sequelize(config)
  : new Sequelize(config.database, config.username, config.password, config);

const db = {
  sequelize,
  Sequelize,
  User: require('./User')(sequelize, DataTypes),
  Task: require('./Task')(sequelize, DataTypes),
  Note: require('./Note')(sequelize, DataTypes),
  Event: require('./Event')(sequelize, DataTypes),
  Expense: require('./Expense')(sequelize, DataTypes),
  Habit: require('./Habit')(sequelize, DataTypes)
};

Object.values(db)
  .filter((model) => model && model.associate)
  .forEach((model) => model.associate(db));

module.exports = db;
