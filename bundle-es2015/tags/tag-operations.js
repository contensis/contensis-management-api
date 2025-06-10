import { defaultMapperForLanguage, defaultMapperForPublishedVersionStatus, UrlBuilder } from 'contensis-core-api';
import { isString } from '../utils';
import { TagGroupOperations } from './tag-group-operations';
const getMappers = {
    language: defaultMapperForLanguage,
};
const listMappers = {
    language: defaultMapperForLanguage,
    order: (value) => (value && value.length > 0) ? value : null,
    pageIndex: (value, options, params) => (options?.pageOptions?.pageIndex) || (params.pageIndex),
    pageSize: (value, options, params) => (options?.pageOptions?.pageSize) || (params.pageSize),
    q: (value) => isString(value) ? value : null,
};
const usageListMappers = {
    language: defaultMapperForLanguage,
    pageIndex: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
    pageSize: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
    versionStatus: defaultMapperForPublishedVersionStatus,
};
export class TagOperations {
    httpClient;
    contensisClient;
    groups;
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
        this.groups = new TagGroupOperations(httpClient, contensisClient);
    }
    async get(idOrOptions) {
        if (!idOrOptions) {
            throw new Error('A valid tag id needs to be specified.');
        }
        if (!isString(idOrOptions) &&
            (!idOrOptions.groupId || !isString(idOrOptions.label))) {
            throw new Error('A valid tag group id and label needs to be specified.');
        }
        const tagId = isString(idOrOptions) && idOrOptions;
        const urlTemplate = isString(idOrOptions)
            ? '/api/management/projects/:projectId/tags/:id'
            : '/api/management/projects/:projectId/taggroups/:groupId/tags';
        const urlBuilder = UrlBuilder.create(urlTemplate, { label: null, language: null });
        if (tagId)
            urlBuilder.addOptions(tagId, 'id');
        else
            urlBuilder.addOptions(idOrOptions);
        const url = urlBuilder
            .setParams(this.contensisClient.getParams())
            .addMappers(getMappers)
            .toUrl();
        await this.contensisClient.ensureBearerToken();
        return await this.httpClient.request(url, {
            headers: this.contensisClient.getHeaders()
        });
    }
    async list(groupIdOrOptions) {
        const urlTemplate = (!groupIdOrOptions || !isString(groupIdOrOptions) &&
            (!groupIdOrOptions.groupId))
            ? '/api/management/projects/:projectId/tags'
            : '/api/management/projects/:projectId/taggroups/:groupId/tags';
        const url = UrlBuilder.create(urlTemplate, { language: null, order: null, pageIndex: null, pageSize: null, q: null })
            .addOptions(groupIdOrOptions, 'groupId')
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();
        await this.contensisClient.ensureBearerToken();
        return await this.httpClient.request(url, {
            headers: this.contensisClient.getHeaders()
        });
    }
    async create(tag) {
        if (!tag) {
            throw new Error('A valid tag needs to be specified.');
        }
        if (!tag.value || !tag.groupId || !tag.label) {
            throw new Error('A valid tag value, tag group id and label needs to be specified.');
        }
        const url = UrlBuilder.create('/api/management/projects/:projectId/tags', {})
            .setParams(this.contensisClient.getParams())
            .toUrl();
        await this.contensisClient.ensureBearerToken();
        return await this.httpClient.request(url, {
            headers: this.contensisClient.getHeaders(),
            method: 'POST',
            body: JSON.stringify(tag)
        });
    }
    async update(tag) {
        if (!tag) {
            throw new Error('A valid tag needs to be specified.');
        }
        if (!tag.id) {
            throw new Error('A valid tag id value needs to be specified.');
        }
        const url = UrlBuilder.create('/api/management/projects/:projectId/tags/:id', {})
            .addOptions(tag.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        await this.contensisClient.ensureBearerToken();
        return await this.httpClient.request(url, {
            headers: this.contensisClient.getHeaders(),
            method: 'PUT',
            body: JSON.stringify(tag)
        });
    }
    async getUsage(idOrOptions) {
        const url = UrlBuilder.create('/api/management/projects/:projectId/tags/:id/usage', { language: null, pageIndex: null, pageSize: null, q: null, versionStatus: null })
            .addOptions(idOrOptions, 'id')
            .setParams(this.contensisClient.getParams())
            .addMappers(usageListMappers)
            .toUrl();
        await this.contensisClient.ensureBearerToken();
        return await this.httpClient.request(url, {
            headers: this.contensisClient.getHeaders()
        });
    }
    async delete(idOrOptions, replacementTagId) {
        if (!idOrOptions) {
            throw new Error('A valid tag id needs to be specified.');
        }
        if ((!isString(idOrOptions) &&
            (!idOrOptions.groupId
                || !Array.isArray(idOrOptions.ids)
                || (Array.isArray(idOrOptions.ids) && !idOrOptions.ids.length)))) {
            throw new Error('A valid tag group id and array of tag ids needs to be specified.');
        }
        const tagId = isString(idOrOptions) ? idOrOptions : null;
        const groupId = !isString(idOrOptions) ? idOrOptions.groupId : null;
        const urlTemplate = isString(idOrOptions)
            ? '/api/management/projects/:projectId/tags/:id'
            : '/api/management/projects/:projectId/taggroups/:groupId/tags/bulk';
        const url = UrlBuilder.create(urlTemplate, { replacementTagId: null })
            .addOptions(tagId, 'id')
            .addOptions(groupId, 'groupId')
            .addOptions(replacementTagId, 'replacementTagId')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        await this.contensisClient.ensureBearerToken();
        if (isString(idOrOptions))
            return await this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'DELETE'
            });
        const bulkDeleteTagIds = idOrOptions.ids;
        return await this.httpClient.request(url, {
            headers: this.contensisClient.getHeaders(),
            method: 'DELETE',
            body: JSON.stringify(bulkDeleteTagIds)
        });
    }
}
