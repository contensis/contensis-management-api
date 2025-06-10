"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagGroupOperations = void 0;
const contensis_core_api_1 = require("contensis-core-api");
const utils_1 = require("../utils");
const listMappers = {
    language: (value) => (0, utils_1.isString)(value) ? value : null,
    order: (value) => (value && value.length > 0) ? value : null,
    pageIndex: (value, options, params) => { var _a; return ((_a = options === null || options === void 0 ? void 0 : options.pageOptions) === null || _a === void 0 ? void 0 : _a.pageIndex) || (params.pageIndex); },
    pageSize: (value, options, params) => { var _a; return ((_a = options === null || options === void 0 ? void 0 : options.pageOptions) === null || _a === void 0 ? void 0 : _a.pageSize) || (params.pageSize); },
    q: (value) => (0, utils_1.isString)(value) ? value : null,
};
const usageListMappers = {
    pageIndex: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
    pageSize: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
};
class TagGroupOperations {
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
    }
    async get(id) {
        if (!(0, utils_1.isString)(id)) {
            throw new Error('A valid tag group id needs to be specified.');
        }
        const url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/taggroups/:id', {})
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        await this.contensisClient.ensureBearerToken();
        return await this.httpClient.request(url, {
            headers: this.contensisClient.getHeaders()
        });
    }
    async list(options) {
        const url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/taggroups', { language: null, order: null, pageIndex: null, pageSize: null, q: null })
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
        const url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/taggroups', {})
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
        const url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/taggroups/:id', {})
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
        const url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/taggroups/:id/usage', { pageIndex: null, pageSize: null })
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
        const url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/taggroups/:id', {})
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
exports.TagGroupOperations = TagGroupOperations;
