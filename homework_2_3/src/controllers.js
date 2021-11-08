// import { UserService } from './services/localUser.service';
import { UserService } from './services/herokuUser.service';

const User = new UserService({});

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const currentUser = await User.getUserById(id);
  if (currentUser) res.send(currentUser);
  res.status(404).send('User not found.');
};

export const createUser = async (req, res) => {
  const { login, password, age } = req.body;
  const newUser = await User.createUser({ login, password, age });
  res.send(newUser);
};

export const updateUserInfo = async (req, res) => {
  const { id, login, password, age } = req.body;
  const updatedUser = await User.updateUserInfo({ id, login, password, age });
  if (updatedUser) res.send(updatedUser);
  res.status(404).send('User not found.');
};

export const getAutoSuggestUsers = async (req, res) => {
  const { loginSubstring, limit } = req.query;

  const suggestUsers = await User.getSuggestUsers(loginSubstring, limit);

  res.send(suggestUsers);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const currentUser = await User.getUserById(id);
  if (currentUser) {
    await User.deleteUser(id);
    res.sendStatus(204);
  }
  res.sendStatus(404).send('User not found.');
};
