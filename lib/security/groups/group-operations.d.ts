import { ContensisClient, Group, GroupListOptions, IGroupOperations, User, GroupUserListOptions, GroupChildListOptions, GroupCreate } from '../../models';
import { IHttpClient, PagedList } from 'contensis-core-api';
export declare class GroupOperations implements IGroupOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    getById(groupId: string): Promise<Group>;
    getByName(groupName: string): Promise<Group>;
    list(options?: GroupListOptions): Promise<PagedList<Group>>;
    create(group: GroupCreate): Promise<Group>;
    update(group: Group): Promise<Group>;
    delete(id: string): Promise<void>;
    addUser(groupId: string, userId: string): Promise<void>;
    addUsers(groupId: string, userIds: string[]): Promise<void>;
    removeUser(groupId: string, userId: string): Promise<void>;
    hasUser(groupId: string, userId: string): Promise<boolean>;
    addChildGroup(groupId: string, childGroupId: string): Promise<void>;
    removeChildGroup(groupId: string, childGroupId: string): Promise<void>;
    getUsersByGroupId(groupId: string, options?: GroupUserListOptions): Promise<PagedList<User>>;
    getUsersByGroupName(groupName: string, options?: GroupUserListOptions): Promise<PagedList<User>>;
    getChildGroupsByGroupId(groupId: string, options?: GroupChildListOptions): Promise<PagedList<Group>>;
    getChildGroupsByGroupName(groupName: string, options?: GroupChildListOptions): Promise<PagedList<Group>>;
    private getGroup;
    private getUsersInGroup;
    private getChildGroups;
}
