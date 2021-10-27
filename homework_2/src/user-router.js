const express = require('express');
const userRouter = express.Router();

const USERS = {};

const getUserById = (req, res) => {
  const { id } = req.params;
  const currentUser = USERS[id];
  if (currentUser) res.send(currentUser);
  res.status(404).end();
};
const createUser = (req, res) => {
  res.send({});
};
const updateUserInfo = (req, res) => {
  res.send({});
};
const getAutoSuggestUsers = (req, res) => {
  res.send({});
};
const deleteUser = (req, res) => {
  res.send({});
};

router
  .get('/:id', getUserById)
  .post('/', createUser)
  .put('/', updateUserInfo)
  .post('/auto-suggest-users', getAutoSuggestUsers)
  .delete('/:id', deleteUser);

export { userRouter };
