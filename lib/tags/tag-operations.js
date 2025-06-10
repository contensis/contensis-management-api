"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagOperations = void 0;
const contensis_core_api_1 = require("contensis-core-api");
const utils_1 = require("../utils");
const tag_group_operations_1 = require("./tag-group-operations");
const getMappers = {
    language: contensis_core_api_1.defaultMapperForLanguage,
};
const listMappers = {
    language: contensis_core_api_1.defaultMapperForLanguage,
    order: (value) => (value && value.length > 0) ? value : null,
    pageIndex: (value, options, params) => { var _a; return ((_a = options === null || options === void 0 ? void 0 : options.pageOptions) === null || _a === void 0 ? void 0 : _a.pageIndex) || (params.pageIndex); },
    pageSize: (value, options, params) => { var _a; return ((_a = options === null || options === void 0 ? void 0 : options.pageOptions) === null || _a === void 0 ? void 0 : _a.pageSize) || (params.pageSize); },
    q: (value) => (0, utils_1.isString)(value) ? value : null,
};
const usageListMappers = {
    language: contensis_core_api_1.defaultMapperForLanguage,
    pageIndex: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
    pageSize: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
    versionStatus: contensis_core_api_1.defaultMapperForPublishedVersionStatus,
};
class TagOperations {
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
        this.groups = new tag_group_operations_1.TagGroupOperations(httpClient, contensisClient);
    }
    async get(idOrOptions) {
        if (!idOrOptions) {
            throw new Error('A valid tag id needs to be specified.');
        }
        if (!(0, utils_1.isString)(idOrOptions) &&
            (!idOrOptions.groupId || !(0, utils_1.isString)(idOrOptions.label))) {
            throw new Error('A valid tag group id and label needs to be specified.');
        }
        const tagId = (0, utils_1.isString)(idOrOptions) && idOrOptions;
        const urlTemplate = (0, utils_1.isString)(idOrOptions)
            ? '/api/management/projects/:projectId/tags/:id'
            : '/api/management/projects/:projectId/taggroups/:groupId/tags';
        const urlBuilder = contensis_core_api_1.UrlBuilder.create(urlTemplate, { label: null, language: null });
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
        const urlTemplate = (!groupIdOrOptions || !(0, utils_1.isString)(groupIdOrOptions) &&
            (!groupIdOrOptions.groupId))
            ? '/api/management/projects/:projectId/tags'
            : '/api/management/projects/:projectId/taggroups/:groupId/tags';
        const url = contensis_core_api_1.UrlBuilder.create(urlTemplate, { language: null, order: null, pageIndex: null, pageSize: null, q: null })
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
        const url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/tags', {})
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
        const url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/tags/:id', {})
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
        const url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/tags/:id/usage', { language: null, pageIndex: null, pageSize: null, q: null, versionStatus: null })
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
        if ((!(0, utils_1.isString)(idOrOptions) &&
            (!idOrOptions.groupId
                || !Array.isArray(idOrOptions.ids)
                || (Array.isArray(idOrOptions.ids) && !idOrOptions.ids.length)))) {
            throw new Error('A valid tag group id and array of tag ids needs to be specified.');
        }
        const tagId = (0, utils_1.isString)(idOrOptions) ? idOrOptions : null;
        const groupId = !(0, utils_1.isString)(idOrOptions) ? idOrOptions.groupId : null;
        const urlTemplate = (0, utils_1.isString)(idOrOptions)
            ? '/api/management/projects/:projectId/tags/:id'
            : '/api/management/projects/:projectId/taggroups/:groupId/tags/bulk';
        const url = contensis_core_api_1.UrlBuilder.create(urlTemplate, { replacementTagId: null })
            .addOptions(tagId, 'id')
            .addOptions(groupId, 'groupId')
            .addOptions(replacementTagId, 'replacementTagId')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        await this.contensisClient.ensureBearerToken();
        if ((0, utils_1.isString)(idOrOptions))
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
exports.TagOperations = TagOperations;
