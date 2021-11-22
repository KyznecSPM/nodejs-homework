import { DataTypes } from 'sequelize';
import { database } from '../config/database';

export const UserGroup = database.define('UserGroup', {
  groupId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
