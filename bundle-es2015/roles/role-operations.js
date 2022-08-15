import { UrlBuilder } from 'contensis-core-api';
let listMappers = {
    pageIndex: (value, options, params) => (options && options.pageIndex) || (params.pageIndex),
    pageSize: (value, options, params) => (options && options.pageSize) || (params.pageSize)
};
export class RoleOperations {
    httpClient;
    contensisClient;
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
    }
    get(id) {
        let url = UrlBuilder.create('/api/management/projects/:projectId/security/roles/:id', {})
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    list(options = null) {
        let url = UrlBuilder.create('/api/management/projects/:projectId/security/roles', { pageIndex: null, pageSize: null })
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    create(role) {
        if (!role) {
            throw new Error('A valid role needs to be specified.');
        }
        let url = UrlBuilder.create('/api/management/projects/:projectId/security/roles', {})
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(role)
            });
        });
    }
    update(role) {
        if (!role) {
            throw new Error('A valid role needs to be specified.');
        }
        if (!role.id) {
            throw new Error('A valid role id value needs to be specified.');
        }
        let url = UrlBuilder.create('/api/management/projects/:projectId/security/roles/:id', {})
            .addOptions(role.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT',
                body: JSON.stringify(role)
            });
        });
    }
    delete(id) {
        if (!id) {
            throw new Error('A valid id needs to be specified.');
        }
        let url = UrlBuilder.create('/api/management/projects/:projectId/security/roles/:id', {})
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'DELETE'
            });
        });
    }
}
