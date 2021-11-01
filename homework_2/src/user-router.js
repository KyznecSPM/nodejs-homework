import express from 'express';
import { uuid } from 'uuidv4';
import { createValidator } from 'express-joi-validation';
import { schemas } from './schemas';

const userRouter = express.Router();

/**
 * id: string
 * login: string
 * password: string
 * age: number
 * isDeleted: boolean
 */

const USERS = {};

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

const { createUserPOST, updateUserInfoPUT, getAutoSuggestUsersGET } = schemas;

const validator = createValidator();

userRouter
  .get('/user/:id', getUserById)
  .post('/user', validator.body(createUserPOST), createUser)
  .put('/user', validator.body(updateUserInfoPUT), updateUserInfo)
  .get(
    '/auto-suggest-users',
    validator.query(getAutoSuggestUsersGET),
    getAutoSuggestUsers
  )
  .delete('/user/:id', deleteUser);

export { userRouter };
