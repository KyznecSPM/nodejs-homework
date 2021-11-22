import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { User } from '../models/user';

/**
 * id: string
 * login: string
 * password: string
 * age: number
 * isDeleted: boolean
 */

export class HerokuUserService {
  async getUserById(id) {
    const currentUser = await User.findOne({
      where: {
        id
      }
    });
    return currentUser;
  }

  async deleteUser(id) {
    await User.update(
      { isDeleted: true },
      {
        where: { id }
      }
    );
  }

  async createUser({ login, password, age }) {
    const id = uuidv4();
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

export class LocalUserService {
  constructor(users) {
    this.users = users;
  }

  async getUserById(id) {
    const currentUser = this.users[id];
    return currentUser;
  }

  async deleteUser(id) {
    const currentUser = this.users[id];
    if (!currentUser) return null;
    this.users[id] = { ...currentUser, isDeleted: true };
    return this.users[id];
  }

  async createUser({ login, password, age }) {
    const id = uuidv4();
    const newUser = {
      id,
      login,
      password,
      age,
      isDeleted: false
    };
    this.users[id] = newUser;
    return this.users[id];
  }

  async updateUserInfo({ id, login, password, age }) {
    const currentUser = this.users[id];
    if (!currentUser) return null;

    this.users[id] = {
      ...currentUser,
      login,
      password,
      age
    };
    return this.users[id];
  }

  async getSuggestUsers(loginSubstring, limit) {
    const userIds = Object.keys(this.users);
    const suggestUsers = [];

    for (
      let i = 0;
      !(suggestUsers.length === limit) && i < userIds.length;
      i += 1
    ) {
      const currentId = userIds[i];
      const currentUser = this.users[currentId];
      if (currentUser.login.includes(loginSubstring)) {
        suggestUsers.push(currentUser);
      }
    }

    return suggestUsers;
  }
}

export const UserService = HerokuUserService;
// export const UserService = LocalUserService;
