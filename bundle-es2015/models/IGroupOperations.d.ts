import { Group } from './Group';
import { PagedList } from 'contensis-core-api';
import { GroupListOptions } from './GroupListOptions';
import { User } from './User';
export interface IGroupOperations {
    getById(groupId: string): Promise<Group>;
    getByName(groupName: string): Promise<Group>;
    list(options?: GroupListOptions): Promise<PagedList<Group>>;
    create(user: Group): Promise<Group>;
    update(user: Group): Promise<Group>;
    delete(id: string): Promise<void>;
    addUser(groupId: string, userId: string): Promise<void>;
    removeUser(groupId: string, userId: string): Promise<void>;
    hasUser(groupId: string, userId: string): Promise<boolean>;
    addChildGroup(groupId: string, childGroupId: string): Promise<void>;
    removeChildGroup(groupId: string, childGroupId: string): Promise<void>;
    getUsersByGroupId(groupId: string): Promise<PagedList<User>>;
    getUsersByGroupName(groupName: string): Promise<PagedList<User>>;
    getChildGroupsByGroupId(groupId: string): Promise<PagedList<Group>>;
    getChildGroupsByGroupName(groupName: string): Promise<PagedList<Group>>;
}
