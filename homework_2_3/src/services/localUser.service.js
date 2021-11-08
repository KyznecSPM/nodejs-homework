import { uuid } from 'uuidv4';

/**
 * id: string
 * login: string
 * password: string
 * age: number
 * isDeleted: boolean
 */

export class UserService {
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
    const id = uuid();
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
