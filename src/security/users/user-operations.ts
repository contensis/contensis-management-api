import { ContensisClient, IUserOperations, User, UserListOptions, Group, UserGroupsOptions, UserUpdatePasswordOptions } from '../../models';
import { ClientParams, IHttpClient, MapperFn, PagedList, UrlBuilder } from 'contensis-core-api';

let listMappers: { [key: string]: MapperFn } = {
    pageIndex: (value: number, options: UserListOptions, params: ClientParams) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
    pageSize: (value: number, options: UserListOptions, params: ClientParams) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
    order: (value: string[]) => (value && value.length > 0) ? value : null,
};

type UserActionType = 'suspend' | 'unlock' | 'unsuspend';

export class UserOperations implements IUserOperations {

    constructor(private httpClient: IHttpClient, private contensisClient: ContensisClient) {
        if (!this.httpClient || !this.contensisClient) {
            throw new Error('The class UserOperations was not initialised correctly.');
        }
    }

    getCurrent(): Promise<User> {
        return this.getUser('@current');
    }

    getById(userId: string): Promise<User> {
        if (!userId) {
            throw new Error('A valid user id needs to be specified.');
        }

        return this.getUser(userId);
    }

    getByUsername(username: string): Promise<User> {
        if (!username) {
            throw new Error('A valid user name needs to be specified.');
        }

        return this.getUser(username);
    }

    getByEmail(email: string): Promise<User> {
        if (!email) {
            throw new Error('A valid user email needs to be specified.');
        }

        return this.getUser(email);
    }

    list(options?: UserListOptions): Promise<PagedList<User>> {
        let url = UrlBuilder.create('/api/security/users',
            !options ? {} : { q: null, pageIndex: null, pageSize: null, order: null })
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<PagedList<User>>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    getUserGroups(userIdOrOptions: string | UserGroupsOptions): Promise<PagedList<Group>> {
        let url = UrlBuilder.create('/api/security/users/:userId/groups',
            { order: null, pageIndex: null, pageSize: null, includeInherited: null })
            .addOptions(userIdOrOptions, 'userId')
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<PagedList<Group>>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    create(user: User, suspended?: boolean): Promise<User> {
        if (!user) {
            throw new Error('A valid user needs to be specified.');
        }

        let url = UrlBuilder.create('/api/security/users',
            { suspended: null })
            .addOptions({ suspended: suspended === true ? true : null })
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<User>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(user)
            });
        });
    }

    update(user: User): Promise<User> {
        if (!user) {
            throw new Error('A valid user needs to be specified.');
        }

        if (!user.id) {
            throw new Error('A valid user id value needs to be specified.');
        }

        let url = UrlBuilder.create('/api/security/users/:id',
            {})
            .addOptions(user.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<User>(url, {
                headers: this.contensisClient.getHeaders('application/merge-patch+json; charset=utf-8'),
                method: 'PATCH',
                body: JSON.stringify(user)
            });
        });
    }

    updatePassword(options: UserUpdatePasswordOptions): Promise<void> {
        if (!options || !options.userId) {
            throw new Error('A valid user id needs to be specified.');
        }

        if (!options.new) {
            throw new Error('A valid new password value needs to be specified.');
        }

        let url = UrlBuilder.create('/api/security/users/:userId/credentials/password',
            {})
            .addOptions(options, 'userId')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        let requestObject = { new: options.new };
        if (!!options.existing) {
            requestObject['existing'] = options.existing;
        }

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<void>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(requestObject)
            });
        });
    }

    delete(id: string): Promise<void> {
        if (!id) {
            throw new Error('A valid id needs to be specified.');
        }

        let url = UrlBuilder.create('/api/security/users/:id',
            {})
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<void>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'DELETE'
            });
        });
    }

    userIsMemberOf(userId: string, ...groupIdsOrNames: string[]): Promise<boolean> {
        if (!userId) {
            throw new Error('A valid user id needs to be specified.');
        }

        if (!groupIdsOrNames || groupIdsOrNames.length === 0) {
            throw new Error('At least a valid group id or name needs to be specified.');
        }

        let url = UrlBuilder.create('/api/security/users/:userId/groups/:groupIdsOrNamesCsv',
            {})
            .addOptions(userId, 'userId')
            .addOptions(groupIdsOrNames.join(','), 'groupIdsOrNamesCsv')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<void>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'HEAD'
            }).then(() => true, () => false);
        });
    }

    suspendUser(userId: string): Promise<void> {
        return this.performUserAction(userId, 'suspend');
    }

    unlockUser(userId: string): Promise<void> {
        return this.performUserAction(userId, 'unlock');
    }

    unsuspendUser(userId: string): Promise<void> {
        return this.performUserAction(userId, 'unsuspend');
    }

    private performUserAction(userId: string, userActionType: UserActionType): Promise<void> {
        if (!userId) {
            throw new Error('A valid user id needs to be specified.');
        }

        let url = UrlBuilder.create('/api/security/users/:id/actions',
            {})
            .addOptions(userId, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<void>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify({ type: userActionType })
            });
        });
    }

    private getUser(idOrNameOrEmail: string) {
        let url = UrlBuilder.create('/api/security/users/:idOrNameOrEmail', {})
            .addOptions(idOrNameOrEmail, 'idOrNameOrEmail')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<User>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
}
