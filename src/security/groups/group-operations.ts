import { ContensisClient, Group, GroupListOptions, IGroupOperations, User, UserListOptions, GroupUserListOptions, GroupChildListOptions, GroupToCreate } from '../../models';
import { IHttpClient, PagedList, UrlBuilder, MapperFn, ClientParams } from 'contensis-core-api';

let listMappers: { [key: string]: MapperFn } = {
    pageIndex: (value: number, options: GroupListOptions, params: ClientParams) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
    pageSize: (value: number, options: GroupListOptions, params: ClientParams) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
    order: (value: string[]) => (value && value.length > 0) ? value : null,
};

let userListMappers: { [key: string]: MapperFn } = {
    pageIndex: (value: number, options: UserListOptions, params: ClientParams) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
    pageSize: (value: number, options: UserListOptions, params: ClientParams) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
    order: (value: string[]) => (value && value.length > 0) ? value : null,
};

export class GroupOperations implements IGroupOperations {

    constructor(private httpClient: IHttpClient, private contensisClient: ContensisClient) {
        if (!this.httpClient || !this.contensisClient) {
            throw new Error('The class GroupOperations was not initialised correctly.');
        }
    }

    getById(groupId: string): Promise<Group> {
        if (!groupId) {
            throw new Error('A valid group id value needs to be specified.');
        }

        return this.getGroup(groupId);
    }

    getByName(groupName: string): Promise<Group> {
        if (!groupName) {
            throw new Error('A valid group name value needs to be specified.');
        }

        return this.getGroup(groupName);
    }

    list(options?: GroupListOptions): Promise<PagedList<Group>> {
        let url = UrlBuilder.create('/api/security/groups',
            !options ? {} : { q: null, pageIndex: null, pageSize: null, order: null })
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<PagedList<Group>>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    create(group: GroupToCreate): Promise<Group> {
        if (!group) {
            throw new Error('A valid group needs to be specified.');
        }

        let url = UrlBuilder.create('/api/security/groups',
            {})
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<Group>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(group)
            });
        });
    }

    update(group: Group): Promise<Group> {
        if (!group) {
            throw new Error('A valid group needs to be specified.');
        }

        if (!group.id) {
            throw new Error('A valid group id value needs to be specified.');
        }

        let url = UrlBuilder.create('/api/security/groups/:id',
            {})
            .addOptions(group.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<Group>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT',
                body: JSON.stringify(group)
            });
        });
    }

    delete(id: string): Promise<void> {
        if (!id) {
            throw new Error('A valid id needs to be specified.');
        }

        let url = UrlBuilder.create('/api/security/groups/:id',
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

    addUser(groupId: string, userId: string): Promise<void> {
        if (!groupId) {
            throw new Error('A valid group id needs to be specified.');
        }

        if (!userId) {
            throw new Error('A valid user id needs to be specified.');
        }

        let url = UrlBuilder.create('/api/security/groups/:groupId/users/:userId',
            {})
            .addOptions(groupId, 'groupId')
            .addOptions(userId, 'userId')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<void>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT'
            });
        });
    }

    addUsers(groupId: string, userIds: string[]): Promise<void> {
        if (!groupId) {
            throw new Error('A valid group id needs to be specified.');
        }

        if (!userIds || userIds.length === 0) {
            throw new Error('At least one valid user id needs to be specified.');
        }

        let url = UrlBuilder.create('/api/security/groups/:groupId/users',
            {})
            .addOptions(groupId, 'groupId')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<void>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(userIds)
            });
        });
    }

    removeUser(groupId: string, userId: string): Promise<void> {
        if (!groupId) {
            throw new Error('A valid group id needs to be specified.');
        }

        if (!userId) {
            throw new Error('A valid user id needs to be specified.');
        }

        let url = UrlBuilder.create('/api/security/groups/:groupId/users/:userId',
            {})
            .addOptions(groupId, 'groupId')
            .addOptions(userId, 'userId')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<void>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'DELETE'
            });
        });
    }

    hasUser(groupId: string, userId: string): Promise<boolean> {
        if (!groupId) {
            throw new Error('A valid group id needs to be specified.');
        }

        if (!userId) {
            throw new Error('A valid users id needs to be specified.');
        }

        let url = UrlBuilder.create('/api/security/groups/:groupId/users/:userId',
            {})
            .addOptions(groupId, 'groupId')
            .addOptions(userId, 'userId')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<void>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'HEAD'
            }).then(() => true, () => false);
        });
    }

    addChildGroup(groupId: string, childGroupId: string): Promise<void> {
        if (!groupId) {
            throw new Error('A valid group id needs to be specified.');
        }

        if (!childGroupId) {
            throw new Error('A valid child group id needs to be specified.');
        }

        let url = UrlBuilder.create('/api/security/groups/:groupId/groups/:childGroupId',
            {})
            .addOptions(groupId, 'groupId')
            .addOptions(childGroupId, 'childGroupId')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<void>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT'
            });
        });
    }

    removeChildGroup(groupId: string, childGroupId: string): Promise<void> {
        if (!groupId) {
            throw new Error('A valid group id needs to be specified.');
        }

        if (!childGroupId) {
            throw new Error('A valid child group id needs to be specified.');
        }

        let url = UrlBuilder.create('/api/security/groups/:groupId/groups/:childGroupId',
            {})
            .addOptions(groupId, 'groupId')
            .addOptions(childGroupId, 'childGroupId')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<void>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'DELETE'
            });
        });
    }

    getUsersByGroupId(groupId: string, options?: GroupUserListOptions): Promise<PagedList<User>> {
        if (!groupId) {
            throw new Error('A valid group id value needs to be specified.');
        }

        return this.getUsersInGroup(groupId, options);
    }
    getUsersByGroupName(groupName: string, options?: GroupUserListOptions): Promise<PagedList<User>> {
        if (!groupName) {
            throw new Error('A valid group name value needs to be specified.');
        }

        return this.getUsersInGroup(groupName, options);
    }

    getChildGroupsByGroupId(groupId: string, options?: GroupChildListOptions): Promise<PagedList<Group>> {
        if (!groupId) {
            throw new Error('A valid group id value needs to be specified.');
        }

        return this.getChildGroups(groupId, options);
    }
    getChildGroupsByGroupName(groupName: string, options?: GroupChildListOptions): Promise<PagedList<Group>> {
        if (!groupName) {
            throw new Error('A valid group name value needs to be specified.');
        }

        return this.getChildGroups(groupName, options);
    }

    private getGroup(idOrName: string) {
        let url = UrlBuilder.create('/api/security/groups/:idOrName', {})
            .addOptions(idOrName, 'idOrName')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<Group>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    private getUsersInGroup(idOrName: string, options?: GroupUserListOptions) {
        let url = UrlBuilder.create('/api/security/groups/:idOrName/users',
            !options ? {} : { includeInherited: null, q: null, pageIndex: null, pageSize: null, order: null })
            .addOptions(idOrName, 'idOrName')
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(userListMappers)
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<PagedList<User>>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    private getChildGroups(idOrName: string, options?: GroupChildListOptions) {
        let url = UrlBuilder.create('/api/security/groups/:idOrName/groups',
            !options ? {} : { includeInherited: null, q: null, pageIndex: null, pageSize: null, order: null })
            .addOptions(idOrName, 'idOrName')
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<PagedList<Group>>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
}
