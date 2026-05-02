require('dotenv').config();

const dialect = process.env.DB_DIALECT || (process.env.NODE_ENV === 'production' ? 'mysql' : 'sqlite');

const common = {
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    underscored: false,
    timestamps: true
  }
};

const mysql = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME || 'studypal',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  dialect: 'mysql',
  ...common
};

const sqlite = {
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || 'database/studypal.sqlite',
  ...common
};

const base = dialect === 'sqlite' ? sqlite : mysql;

module.exports = {
  development: base,
  test: dialect === 'sqlite'
    ? { ...sqlite, storage: ':memory:', logging: false }
    : { ...mysql, database: `${mysql.database}_test`, logging: false },
  production: {
    ...mysql,
    logging: false,
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : undefined
    }
  }
};