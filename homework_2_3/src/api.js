import express from 'express';
import { validator } from './common/validator';
import {
  getUserById,
  createUser,
  updateUserInfo,
  getAutoSuggestUsers,
  deleteUser
} from './controllers';

const userRouter = express.Router();

userRouter
  .get('/user/:id', getUserById)
  .post('/user', validator.createUserPOST, createUser)
  .put('/user', validator.updateUserInfoPUT, updateUserInfo)
  .get(
    '/auto-suggest-users',
    validator.getAutoSuggestUsersGET,
    getAutoSuggestUsers
  )
  .delete('/user/:id', deleteUser);

export { userRouter };
