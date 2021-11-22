import { GroupService } from '../services/group.service';

const Group = new GroupService();

export const getAllGroups = async (req, res) => {
  const groups = await Group.getAllGroups();
  res.send(groups);
};

export const getGroupById = async (req, res) => {
  const { id } = req.params;
  const currentGroup = await Group.getGroupById(id);
  if (currentGroup) {
    res.send(currentGroup);
  } else {
    res.status(404).send('Group not found.');
  }
};

export const createGroup = async (req, res) => {
  const { name, permissions } = req.body;
  const newGroup = await Group.createGroup({ name, permissions });
  res.send(newGroup);
};

export const updateGroup = async (req, res) => {
  const { id, name, permissions } = req.body;
  const updatedGroup = await Group.updateGroup({ id, name, permissions });
  if (updatedGroup) {
    res.send(updatedGroup);
  } else {
    res.status(404).send('Group not found.');
  }
};

export const deleteGroup = async (req, res) => {
  const { id } = req.params;
  const currentGroup = Group.getGroupById(id);
  if (currentGroup) {
    await Group.deleteGroup(id);
    res.sendStatus(204);
  } else {
    res.sendStatus(404).send('Group not found.');
  }
};
