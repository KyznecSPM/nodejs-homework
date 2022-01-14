import * as group from './group';

const { Group: GroupService, ...groupController } = group;

describe('group controller', () => {
  it('getAllGroups should return empty array', async () => {
    jest.spyOn(GroupService, 'getAllGroups').mockResolvedValueOnce([]);
    const mReq = {};
    const mRes = { sendStatus: jest.fn().mockReturnThis(), send: jest.fn() };
    const mNext = jest.fn();
    await groupController.getAllGroups(mReq, mRes, mNext);
    expect(mRes.send).toBeCalledWith([]);
  });
  it('getGroupById should error', async () => {
    const mReq = {};
    const mRes = { sendStatus: jest.fn().mockReturnThis(), send: jest.fn() };
    const mNext = jest.fn();
    await groupController.getGroupById(mReq, mRes, mNext);
    expect(mRes.sendStatus).toBeCalledWith(400);
  });
  it('createGroup should error', async () => {
    const mReq = {};
    const mRes = { sendStatus: jest.fn().mockReturnThis(), send: jest.fn() };
    const mNext = jest.fn();
    await groupController.createGroup(mReq, mRes, mNext);
    expect(mRes.sendStatus).toBeCalledWith(400);
  });
  it('updateGroup should error', async () => {
    const mReq = {};
    const mRes = { sendStatus: jest.fn().mockReturnThis(), send: jest.fn() };
    const mNext = jest.fn();
    await groupController.updateGroup(mReq, mRes, mNext);
    expect(mRes.sendStatus).toBeCalledWith(400);
  });
  it('deleteGroup should error', async () => {
    const mReq = {};
    const mRes = { sendStatus: jest.fn().mockReturnThis(), send: jest.fn() };
    const mNext = jest.fn();
    await groupController.deleteGroup(mReq, mRes, mNext);
    expect(mRes.sendStatus).toBeCalledWith(400);
  });
  it('addUsersToGroup should error', async () => {
    const mReq = { body: {} };
    const mRes = { sendStatus: jest.fn().mockReturnThis(), send: jest.fn() };
    const mNext = jest.fn();
    await groupController.addUsersToGroup(mReq, mRes, mNext);
    expect(mRes.sendStatus).toBeCalledWith(400);
  });
});
