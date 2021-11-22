import { v4 as uuidv4 } from 'uuid';
import { Groups } from '../models/group';

/**
 * id: string
 * name: string
 * permissions: Array<Permissions>
 */

export class GroupService {
  async getAllGroups() {
    const allGroups = await Groups.findAll();
    return allGroups;
  }

  async getGroupById(id) {
    const currentGroup = await Groups.findOne({
      where: {
        id
      }
    });
    return currentGroup;
  }

  async deleteGroup(id) {
    await Groups.destroy({
      where: {
        id
      }
    });
  }

  async createGroup({ name, permissions }) {
    const id = uuidv4();
    const newGroup = await Groups.create({
      id,
      name,
      permissions
    });
    return newGroup;
  }

  async updateGroup({ id, name, permissions }) {
    const group = await this.getGroupById(id);

    const updatedGroup = await Groups.update(
      { ...group, name, permissions },
      {
        where: { id }
      }
    ).then(() => Groups.findOne({ where: { id } }));

    return updatedGroup;
  }
}
