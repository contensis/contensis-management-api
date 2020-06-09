import { User } from './User';
import { PagedList } from 'contensis-core-api';
import { UserListOptions } from './UserListOptions';
import { Group } from './Group';
import { UserGroupsOptions } from './UserGroupsOptions';
import { UserUpdatePasswordOptions } from './UserUpdatePasswordOptions';
export interface IUserOperations {
    getById(userId: string): Promise<User>;
    getByUsername(username: string): Promise<User>;
    getByEmail(email: string): Promise<User>;
    list(options?: UserListOptions): Promise<PagedList<User>>;
    getUserGroups(userIdOrOptions: string | UserGroupsOptions): Promise<PagedList<Group>>;
    create(user: User): Promise<User>;
    update(user: User): Promise<User>;
    updatePassword(options: UserUpdatePasswordOptions): Promise<void>;
    delete(userId: string): Promise<void>;
    userIsMemberOf(userId: string, ...groupIdsOrNames: string[]): Promise<boolean>;
}
