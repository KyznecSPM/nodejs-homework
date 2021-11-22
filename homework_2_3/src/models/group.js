import { DataTypes } from 'sequelize';
import { database } from '../config/database';

export const Groups = database.define('Groups', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  permissions: DataTypes.ARRAY({
    type: DataTypes.STRING,
    allowNull: false
  })
});
