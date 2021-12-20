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
  updateGroup,
  addUsersToGroup
} from './controllers/group';

import { getLoginJwt } from './controllers/login';

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
  .post('/add-users-to-group', validator.addUsersToGroupPOST, addUsersToGroup)
  .put('/', validator.updateGroupPUT, updateGroup);

const loginRouter = express.Router();

loginRouter.post('/login', validator.getLoginJwt, getLoginJwt);

export { userRouter, groupsRouter, loginRouter };
