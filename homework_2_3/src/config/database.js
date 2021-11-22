import { DATABASE_URL } from './constants';
import Sequelize from 'sequelize';

export const database = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});
