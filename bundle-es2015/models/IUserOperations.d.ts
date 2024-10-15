import { User, UserToCreate } from './User';
import { ManagementQuery, PagedList } from 'contensis-core-api';
import { UserListOptions } from './UserListOptions';
import { Group } from './Group';
import { UserGroupsOptions } from './UserGroupsOptions';
import { UserUpdatePasswordOptions } from './UserUpdatePasswordOptions';
export interface IUserOperations {
    getById(userId: string, isClassic?: boolean): Promise<User>;
    getCurrent(): Promise<User>;
    getByUsername(username: string): Promise<User>;
    getByEmail(email: string): Promise<User>;
    list(options?: UserListOptions): Promise<PagedList<User>>;
    search(query: ManagementQuery): Promise<PagedList<User>>;
    getUserGroups(userIdOrOptions: string | UserGroupsOptions): Promise<PagedList<Group>>;
    create(user: UserToCreate, suspended?: boolean): Promise<User>;
    update(user: User): Promise<User>;
    updatePassword(options: UserUpdatePasswordOptions): Promise<void>;
    delete(userId: string): Promise<void>;
    userIsMemberOf(userId: string, ...groupIdsOrNames: string[]): Promise<boolean>;
    setPasswordToExpirable(userId: string): Promise<void>;
    suspendUser(userId: string): Promise<void>;
    unlockUser(userId: string): Promise<void>;
    unsuspendUser(userId: string): Promise<void>;
}
