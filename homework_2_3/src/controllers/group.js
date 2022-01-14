import { GroupService } from '../services/group.service';

export const Group = new GroupService();

export const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.getAllGroups();
    res.send(groups);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const getGroupById = async (req, res) => {
  try {
    const { id } = req.params;
    const currentGroup = await Group.getGroupById(id);
    if (currentGroup) {
      res.send(currentGroup);
    } else {
      res.status(404).send('Group not found.');
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const createGroup = async (req, res) => {
  try {
    const { name, permissions } = req.body;
    const newGroup = await Group.createGroup({ name, permissions });
    res.send(newGroup);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const updateGroup = async (req, res) => {
  try {
    const { id, name, permissions } = req.body;
    const updatedGroup = await Group.updateGroup({ id, name, permissions });
    if (updatedGroup) {
      res.send(updatedGroup);
    } else {
      res.status(404).send('Group not found.');
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const currentGroup = Group.getGroupById(id);
    if (currentGroup) {
      await Group.deleteGroup(id);
      res.sendStatus(204);
    } else {
      res.sendStatus(404).send('Group not found.');
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const addUsersToGroup = async (req, res) => {
  const { userIds, groupId } = req.body;
  try {
    await Group.addUsersToGroup(groupId, userIds);
    res.status(200).send('Users added to group');
  } catch (error) {
    res.sendStatus(400);
  }
};
