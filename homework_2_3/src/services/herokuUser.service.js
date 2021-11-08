import { uuid } from 'uuidv4';
import { Op } from 'sequelize';
import { User } from '../models';

/**
 * id: string
 * login: string
 * password: string
 * age: number
 * isDeleted: boolean
 */

export class UserService {
  async getUserById(id) {
    const currentUser = await User.findOne({
      where: {
        id
      }
    });
    return currentUser;
  }

  async deleteUser(id) {
    await User.destroy({
      where: {
        id
      }
    });
  }

  async createUser({ login, password, age }) {
    const id = uuid();
    const newUser = await User.create({
      id,
      login,
      password,
      age,
      isDeleted: false
    });
    return newUser;
  }

  async updateUserInfo({ id, login, password, age }) {
    const user = await this.getUserById(id);

    const updatedUser = await User.update(
      { ...user, login, password, age },
      {
        where: { id }
      }
    ).then(() => User.findOne({ where: { id } }));

    return updatedUser;
  }

  async getSuggestUsers(loginSubstring, limit) {
    const sortedUsers = await User.findAll({
      order: ['login'],
      where: {
        login: { [Op.iLike]: `${loginSubstring}%` }
      },
      limit
    });

    return sortedUsers;
  }
}
