import { DATABASE_URL } from './constants';
const Sequelize = require('sequelize');

export const database = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});
