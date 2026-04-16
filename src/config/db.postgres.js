const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('PostgreSQL connected');
    return sequelize.sync(); // Creates tables if they don't exist
  })
  .then(() => console.log('PostgreSQL tables synced'))
  .catch((err) => console.error('PostgreSQL connection error:', err));

module.exports = sequelize;