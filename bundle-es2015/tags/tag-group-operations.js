import { UrlBuilder } from 'contensis-core-api';
import { isString } from '../utils';
const listMappers = {
    language: (value) => isString(value) ? value : null,
    order: (value) => (value && value.length > 0) ? value : null,
    pageIndex: (value, options, params) => (options?.pageOptions?.pageIndex) || (params.pageIndex),
    pageSize: (value, options, params) => (options?.pageOptions?.pageSize) || (params.pageSize),
    q: (value) => isString(value) ? value : null,
};
const usageListMappers = {
    pageIndex: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
    pageSize: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
};
export class TagGroupOperations {
    httpClient;
    contensisClient;
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
    }
    async get(id) {
        if (!isString(id)) {
            throw new Error('A valid tag group id needs to be specified.');
        }
        const url = UrlBuilder.create('/api/management/projects/:projectId/taggroups/:id', {})
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        await this.contensisClient.ensureBearerToken();
        return await this.httpClient.request(url, {
            headers: this.contensisClient.getHeaders()
        });
    }
    async list(options) {
        const url = UrlBuilder.create('/api/management/projects/:projectId/taggroups', { language: null, order: null, pageIndex: null, pageSize: null, q: null })
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();
        await this.contensisClient.ensureBearerToken();
        return await this.httpClient.request(url, {
            headers: this.contensisClient.getHeaders()
        });
    }
    async create(group) {
        if (!group) {
            throw new Error('A valid tag group needs to be specified.');
        }
        if (!group.id || !group.name) {
            throw new Error('A valid tag group id and name needs to be specified.');
        }
        const url = UrlBuilder.create('/api/management/projects/:projectId/taggroups', {})
            .setParams(this.contensisClient.getParams())
            .toUrl();
        await this.contensisClient.ensureBearerToken();
        return await this.httpClient.request(url, {
            headers: this.contensisClient.getHeaders(),
            method: 'POST',
            body: JSON.stringify(group)
        });
    }
    async update(group) {
        if (!group) {
            throw new Error('A valid tag group needs to be specified.');
        }
        if (!group.id) {
            throw new Error('A valid tag group id value needs to be specified.');
        }
        const url = UrlBuilder.create('/api/management/projects/:projectId/taggroups/:id', {})
            .addOptions(group.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        await this.contensisClient.ensureBearerToken();
        return await this.httpClient.request(url, {
            headers: this.contensisClient.getHeaders(),
            method: 'PUT',
            body: JSON.stringify(group)
        });
    }
    async getUsage(idOrOptions) {
        const url = UrlBuilder.create('/api/management/projects/:projectId/taggroups/:id/usage', { pageIndex: null, pageSize: null })
            .addOptions(idOrOptions, 'id')
            .setParams(this.contensisClient.getParams())
            .addMappers(usageListMappers)
            .toUrl();
        await this.contensisClient.ensureBearerToken();
        return await this.httpClient.request(url, {
            headers: this.contensisClient.getHeaders()
        });
    }
    async delete(id) {
        if (!id) {
            throw new Error('A valid tag group id needs to be specified.');
        }
        const url = UrlBuilder.create('/api/management/projects/:projectId/taggroups/:id', {})
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        await this.contensisClient.ensureBearerToken();
        return await this.httpClient.request(url, {
            headers: this.contensisClient.getHeaders(),
            method: 'DELETE'
        });
    }
}
