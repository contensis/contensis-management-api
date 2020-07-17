import { ContensisClient, IRoleOperations, Role } from '../models';
import { IHttpClient, UrlBuilder, PageOptions, MapperFn, ClientParams, PagedList } from 'contensis-core-api';

let listMappers: { [key: string]: MapperFn } = {
    pageIndex: (value: number, options: PageOptions, params: ClientParams) => (options && options.pageIndex) || (params.pageIndex),
    pageSize: (value: number, options: PageOptions, params: ClientParams) => (options && options.pageSize) || (params.pageSize)
};

export class RoleOperations implements IRoleOperations {
    constructor(private httpClient: IHttpClient, private contensisClient: ContensisClient) {

    }

    get(id: string): Promise<Role> {
        let url = UrlBuilder.create('/api/management/projects/:projectId/security/roles/:id',
            {})
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<Role>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    list(options: PageOptions = null): Promise<PagedList<Role>> {
        let url = UrlBuilder.create('/api/management/projects/:projectId/security/roles',
            { pageIndex: null, pageSize: null })
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<PagedList<Role>>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    create(role: Role): Promise<Role> {
        if (!role) {
            throw new Error('A valid role needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/projects/:projectId/security/roles',
            {})
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<Role>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(role)
            });
        });
    }

    update(role: Role): Promise<Role> {
        if (!role) {
            throw new Error('A valid role needs to be specified.');
        }

        if (!role.id) {
            throw new Error('A valid role id value needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/projects/:projectId/security/roles/:id',
            {})
            .addOptions(role.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<Role>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT',
                body: JSON.stringify(role)
            });
        });
    }

    delete(id: string): Promise<void> {
        if (!id) {
            throw new Error('A valid id needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/projects/:projectId/security/roles/:id',
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
}
