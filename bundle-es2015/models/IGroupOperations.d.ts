import { Group, GroupToCreate } from './Group';
import { PagedList } from 'contensis-core-api';
import { GroupListOptions } from './GroupListOptions';
import { User } from './User';
import { GroupUserListOptions, GroupChildListOptions } from '.';
export interface IGroupOperations {
    getById(groupId: string): Promise<Group>;
    getByName(groupName: string): Promise<Group>;
    list(options?: GroupListOptions): Promise<PagedList<Group>>;
    create(group: GroupToCreate): Promise<Group>;
    update(group: Group): Promise<Group>;
    delete(id: string): Promise<void>;
    addUser(groupId: string, userId: string): Promise<void>;
    addUsers(groupId: string, userIds: string[]): Promise<void>;
    removeUser(groupId: string, userId: string): Promise<void>;
    hasUser(groupId: string, userId: string): Promise<boolean>;
    addChildGroup(groupId: string, childGroupId: string): Promise<void>;
    addChildGroups(groupId: string, childGroupIds: string[]): Promise<void>;
    removeChildGroup(groupId: string, childGroupId: string): Promise<void>;
    getUsersByGroupId(groupId: string, options?: GroupUserListOptions): Promise<PagedList<User>>;
    getUsersByGroupName(groupName: string, options?: GroupUserListOptions): Promise<PagedList<User>>;
    getChildGroupsByGroupId(groupId: string, options?: GroupChildListOptions): Promise<PagedList<Group>>;
    getChildGroupsByGroupName(groupName: string, options?: GroupChildListOptions): Promise<PagedList<Group>>;
}
