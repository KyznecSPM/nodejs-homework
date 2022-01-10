import * as user from './user';

const { User: UserService, ...userController } = user;

const id = 'uniqId';
const login = 'login';
const password = 'password';
const age = 20;

const userMockRecord = { id, login, password, age, isDeleted: false };

describe('user controller', () => {
  it('createUser should create user', async () => {
    jest.spyOn(UserService, 'createUser').mockResolvedValueOnce(userMockRecord);
    const mReq = { body: { login, password, age } };
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const mNext = jest.fn();
    await userController.createUser(mReq, mRes, mNext);
    expect(UserService.createUser).toBeCalledWith({ login, password, age });
    expect(mRes.send).toBeCalledWith(userMockRecord);
  });
  it('createUser should error', async () => {
    const mReq = {};
    const mRes = { sendStatus: jest.fn().mockReturnThis(), send: jest.fn() };
    const mNext = jest.fn();
    await userController.createUser(mReq, mRes, mNext);
    expect(mRes.sendStatus).toBeCalledWith(400);
  });
  it('getUserById should return user', async () => {
    jest
      .spyOn(UserService, 'getUserById')
      .mockResolvedValueOnce(userMockRecord);
    const mReq = { params: { id } };
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const mNext = jest.fn();
    await userController.getUserById(mReq, mRes, mNext);
    expect(UserService.getUserById).toBeCalledWith(id);
    expect(mRes.send).toBeCalledWith(userMockRecord);
  });
  it('getUserById should error', async () => {
    const mReq = {};
    const mRes = { sendStatus: jest.fn().mockReturnThis(), send: jest.fn() };
    const mNext = jest.fn();
    await userController.getUserById(mReq, mRes, mNext);
    expect(mRes.sendStatus).toBeCalledWith(400);
  });
  it('updateUserInfo should update user info', async () => {
    jest
      .spyOn(UserService, 'updateUserInfo')
      .mockResolvedValueOnce(userMockRecord);
    const mReq = { body: { id, login, password, age } };
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const mNext = jest.fn();
    await userController.updateUserInfo(mReq, mRes, mNext);
    expect(UserService.updateUserInfo).toBeCalledWith({
      id,
      login,
      password,
      age
    });
    expect(mRes.send).toBeCalledWith(userMockRecord);
  });
  it('updateUserInfo should error', async () => {
    const mReq = {};
    const mRes = { sendStatus: jest.fn().mockReturnThis(), send: jest.fn() };
    const mNext = jest.fn();
    await userController.updateUserInfo(mReq, mRes, mNext);
    expect(mRes.sendStatus).toBeCalledWith(400);
  });
  it('getAutoSuggestUsers should return array of users', async () => {
    jest
      .spyOn(UserService, 'getSuggestUsers')
      .mockResolvedValueOnce([userMockRecord]);
    const limit = 1;
    const loginSubstring = login;
    const mReq = { query: { loginSubstring: login, limit } };
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const mNext = jest.fn();
    await userController.getAutoSuggestUsers(mReq, mRes, mNext);
    expect(UserService.getSuggestUsers).toBeCalledWith(loginSubstring, limit);
    expect(mRes.send).toBeCalledWith([userMockRecord]);
  });
  it('getAutoSuggestUsers should error', async () => {
    const mReq = {};
    const mRes = { sendStatus: jest.fn().mockReturnThis(), send: jest.fn() };
    const mNext = jest.fn();
    await userController.getAutoSuggestUsers(mReq, mRes, mNext);
    expect(mRes.sendStatus).toBeCalledWith(400);
  });
  it('deleteUser should delete user', async () => {
    jest
      .spyOn(UserService, 'getUserById')
      .mockResolvedValueOnce(userMockRecord);
    jest.spyOn(UserService, 'deleteUser');
    const mReq = { params: { id } };
    const mRes = { sendStatus: jest.fn().mockReturnThis(), send: jest.fn() };
    const mNext = jest.fn();
    await userController.deleteUser(mReq, mRes, mNext);
    expect(UserService.getUserById).toBeCalledWith(id);
    expect(UserService.deleteUser).toBeCalledWith(id);
    expect(mRes.sendStatus).toBeCalledWith(204);
  });
  it('getAutoSuggestUsers should error', async () => {
    const mReq = {};
    const mRes = { sendStatus: jest.fn().mockReturnThis(), send: jest.fn() };
    const mNext = jest.fn();
    await userController.deleteUser(mReq, mRes, mNext);
    expect(mRes.sendStatus).toBeCalledWith(400);
  });
  it('getAutoSuggestUsers should user not found', async () => {
    jest.spyOn(UserService, 'getUserById').mockResolvedValueOnce(null);
    const mReq = { params: { id: 'not_found' } };
    const mRes = { sendStatus: jest.fn().mockReturnThis(), send: jest.fn() };
    const mNext = jest.fn();
    await userController.deleteUser(mReq, mRes, mNext);
    expect(mRes.sendStatus).toBeCalledWith(404);
  });
});
