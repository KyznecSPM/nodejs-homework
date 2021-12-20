import { UserService } from '../services/user.service';

const User = new UserService({});

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = await User.getUserById(id);
    if (currentUser) {
      res.send(currentUser);
    } else {
      res.status(404).send('User not found.');
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const createUser = async (req, res) => {
  try {
    const { login, password, age } = req.body;
    const newUser = await User.createUser({ login, password, age });
    res.send(newUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const { id, login, password, age } = req.body;
    const updatedUser = await User.updateUserInfo({ id, login, password, age });
    if (updatedUser) {
      res.send(updatedUser);
    } else {
      res.status(404).send('User not found.');
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const getAutoSuggestUsers = async (req, res) => {
  try {
    const { loginSubstring, limit } = req.query;

    const suggestUsers = await User.getSuggestUsers(loginSubstring, limit);

    res.send(suggestUsers);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = await User.getUserById(id);
    if (currentUser) {
      await User.deleteUser(id);
      res.sendStatus(204);
    } else {
      res.sendStatus(404).send('User not found.');
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
