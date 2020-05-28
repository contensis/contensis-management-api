import { ContensisClient, IUserOperations, User, UserListOptions, Group, UserGroupsOptions } from '../models';
import { ClientParams, IHttpClient, MapperFn, PagedList, UrlBuilder } from 'contensis-core-api';

let listMappers: { [key: string]: MapperFn } = {
    pageIndex: (value: number, options: UserListOptions, params: ClientParams) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
    pageSize: (value: number, options: UserListOptions, params: ClientParams) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
    order: (value: string[]) => (value && value.length > 0) ? value : null,
};

export class UserOperations implements IUserOperations {

    constructor(private httpClient: IHttpClient, private contensisClient: ContensisClient) {
        if (!this.httpClient || !this.contensisClient) {
            throw new Error('The class UserOperations was not initialised correctly.');
        }
    }

    getById(userId: string): Promise<User> {
        return this.getUser(userId);
    }

    getByUsername(username: string): Promise<User> {
        return this.getUser(username);
    }

    getByEmail(email: string): Promise<User> {
        return this.getUser(email);
    }

    list(options?: UserListOptions): Promise<PagedList<User>> {
        let url = UrlBuilder.create('/api/management/security/users',
            !options ? {} : { q: null, pageIndex: null, pageSize: null, order: null })
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();

        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<PagedList<User>>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    getGroups(userIdOrOptions: string | UserGroupsOptions): Promise<PagedList<Group>> {
        let url = UrlBuilder.create('/api/management/security/users/:userId/groups',
            { includeInherited: null })
            .addOptions(userIdOrOptions, 'userId')
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();

        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<PagedList<Group>>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    private getUser(idOrNameOrEmail: string) {
        let url = UrlBuilder.create('/api/management/security/users/:idOrNameOrEmail', {})
            .addOptions(idOrNameOrEmail, 'idOrNameOrEmail')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<User>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
}
