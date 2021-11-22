import express from 'express';
import { validator } from './common/validator';
import {
  getUserById,
  createUser,
  updateUserInfo,
  getAutoSuggestUsers,
  deleteUser
} from './controllers/user';

import {
  getGroupById,
  createGroup,
  deleteGroup,
  getAllGroups,
  updateGroup
} from './controllers/group';

const userRouter = express.Router();

userRouter
  .get('/info/:id', getUserById)
  .post('/', validator.createUserPOST, createUser)
  .put('/', validator.updateUserInfoPUT, updateUserInfo)
  .get(
    '/auto-suggest-users',
    validator.getAutoSuggestUsersGET,
    getAutoSuggestUsers
  )
  .delete('/:id', deleteUser);

const groupsRouter = express.Router();

groupsRouter
  .get('/all', getAllGroups)
  .get('/info/:id', getGroupById)
  .delete('/:id', deleteGroup)
  .post('/', validator.createGroupPOST, createGroup)
  .put('/', validator.updateGroupPUT, updateGroup);

export { userRouter, groupsRouter };
