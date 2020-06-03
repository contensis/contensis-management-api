import { ContensisClient, IUserOperations, User, UserListOptions, Group, UserGroupsOptions, UserUpdatePasswordOptions } from '../models';
import { IHttpClient, PagedList } from 'contensis-core-api';
export declare class UserOperations implements IUserOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    getById(userId: string): Promise<User>;
    getByUsername(username: string): Promise<User>;
    getByEmail(email: string): Promise<User>;
    list(options?: UserListOptions): Promise<PagedList<User>>;
    getGroups(userIdOrOptions: string | UserGroupsOptions): Promise<PagedList<Group>>;
    create(user: User): Promise<User>;
    update(user: User): Promise<User>;
    updatePassword(options: UserUpdatePasswordOptions): Promise<void>;
    delete(id: string): Promise<void>;
    isInGroup(userId: string, groupId: string): Promise<boolean>;
    isInGroups(userId: string, groupIds: string[]): Promise<boolean>;
    private getUser;
}
