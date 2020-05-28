import { User } from './User';
import { PagedList } from 'contensis-core-api';
import { UserListOptions } from './UserListOptions';
import { Group } from './Group';
import { UserGroupsOptions } from './UserGroupsOptions';

export interface IUserOperations {
    getById(userId: string): Promise<User>;
    getByUsername(username: string): Promise<User>;
    getByEmail(email: string): Promise<User>;
    list(options?: UserListOptions): Promise<PagedList<User>>;
    getGroups(userIdOrOptions: string | UserGroupsOptions): Promise<PagedList<Group>>;
}
