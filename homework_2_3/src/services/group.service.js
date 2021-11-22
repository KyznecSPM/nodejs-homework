import { v4 as uuidv4 } from 'uuid';
import { Groups } from '../models/group';
import { UserGroup } from '../models/user-group';
import { User } from '../models/user';
import { database } from '../config/database';
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
    const transaction = await database.transaction();

    try {
      await Groups.destroy(
        {
          where: {
            id
          }
        },
        { transaction }
      );
      await UserGroup.destroy(
        {
          where: {
            groupId: id
          }
        },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      console.error(error);
      await transaction.rollback();
    }
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

  async addUsersToGroup(groupId, userIds) {
    const transaction = await database.transaction();

    const group = await Groups.findOne(
      {
        where: {
          id: groupId
        }
      },
      { transaction }
    );

    if (!group) {
      await transaction.rollback();
      throw new Error(`Group not found! groupId: ${groupId}`);
    }

    const { length } = userIds;

    for (let i = 0; i < length; i += 1) {
      const userId = userIds[i];
      const user = await User.findOne(
        {
          where: {
            id: userId
          }
        },
        { transaction }
      );

      if (!user) {
        await transaction.rollback();
        throw new Error(`User not found! userId: ${userId}`);
      }

      const groupRow = await UserGroup.create(
        {
          groupId,
          userId
        },
        { transaction }
      );
      if (!groupRow) {
        await transaction.rollback();
        throw new Error('Failed to add a user to a group');
      }
    }

    await transaction.commit();
  }
}
