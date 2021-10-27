import express from 'express';
import { uuid } from 'uuidv4';
import { mockData } from './mock-data';

const userRouter = express.Router();

/**
 * id: string
 * login: string
 * password: string
 * age: number
 * isDeleted: boolean
 */

const USERS = mockData;

const getUserById = (req, res) => {
  const { id } = req.params;
  const currentUser = USERS[id];
  if (currentUser) res.send(currentUser);
  res.status(404).send('User not found.');
};

const createUser = (req, res) => {
  const { login, password, age } = req.body;
  const id = uuid();
  const newUser = {
    id,
    login,
    password,
    age,
    isDeleted: false
  };
  USERS[id] = newUser;
  res.send(USERS[id]);
};

const updateUserInfo = (req, res) => {
  const { id, login, password, age } = req.body;
  const currentUser = USERS[id];
  if (currentUser) {
    USERS[id] = { ...currentUser, login, password, age };
    res.send(USERS[id]);
  }
  res.status(404).send('User not found.');
};

const getSuggestUsers = (loginSubstring, limit) => {
  const userIds = Object.keys(USERS);
  const suggestUsers = [];

  for (
    let i = 0;
    !(suggestUsers.length === limit) && i < userIds.length;
    i += 1
  ) {
    const currentId = userIds[i];
    const currentUser = USERS[currentId];
    if (currentUser.login.includes(loginSubstring)) {
      suggestUsers.push(currentUser);
    }
  }

  return suggestUsers;
};

const getAutoSuggestUsers = (req, res) => {
  const { loginSubstring, limit } = req.query;

  // check empty string & zero limit
  if (!loginSubstring && !limit) res.status(404).send('Nothing to look for');

  const suggestUsers = getSuggestUsers(loginSubstring, limit);

  res.send(suggestUsers);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const currentUser = USERS[id];
  if (currentUser) {
    USERS[id] = { ...currentUser, isDeleted: true };
    res.send(USERS[id]);
  }
  res.status(404).send('User not found.');
};

userRouter
  .get('/user/:id', getUserById)
  .post('/user', createUser)
  .put('/user', updateUserInfo)
  .get('/auto-suggest-users', getAutoSuggestUsers)
  .delete('/user/:id', deleteUser);

export { userRouter };
