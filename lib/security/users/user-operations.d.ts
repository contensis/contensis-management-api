import { ContensisClient, IUserOperations, User, UserListOptions, Group, UserGroupsOptions, UserUpdatePasswordOptions, UserToCreate } from '../../models';
import { IHttpClient, ManagementQuery, PagedList } from 'contensis-core-api';
export declare class UserOperations implements IUserOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    getCurrent(): Promise<User>;
    getById(userId: string, isClassic?: boolean): Promise<User>;
    getByUsername(username: string): Promise<User>;
    getByEmail(email: string): Promise<User>;
    list(options?: UserListOptions): Promise<PagedList<User>>;
    search(query: ManagementQuery): Promise<PagedList<User>>;
    getUserGroups(userIdOrOptions: string | UserGroupsOptions): Promise<PagedList<Group>>;
    create(user: UserToCreate, suspended?: boolean): Promise<User>;
    update(user: User): Promise<User>;
    updatePassword(options: UserUpdatePasswordOptions): Promise<void>;
    delete(id: string): Promise<void>;
    userIsMemberOf(userId: string, ...groupIdsOrNames: string[]): Promise<boolean>;
    setPasswordToExpirable(userId: string): Promise<void>;
    suspendUser(userId: string): Promise<void>;
    unlockUser(userId: string): Promise<void>;
    unsuspendUser(userId: string): Promise<void>;
    private performUserAction;
    private getUser;
    private searchUsingManagementQuery;
    private searchUsingPost;
}
