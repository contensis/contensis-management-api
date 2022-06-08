"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const contensis_core_api_1 = require("contensis-core-api");
const defaultListUrl = '/api/management/projects/:projectId/entries';
let getMappers = {
    language: contensis_core_api_1.defaultMapperForLanguage,
    versionStatus: contensis_core_api_1.defaultMapperForLatestVersionStatus,
    version: (value) => (!!value) ? value : null
};
let listMappers = {
    language: contensis_core_api_1.defaultMapperForLanguage,
    versionStatus: contensis_core_api_1.defaultMapperForLatestVersionStatus,
    pageIndex: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
    pageSize: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
    order: (value) => (value && value.length > 0) ? value : null,
};
const usageListMappers = {
    language: contensis_core_api_1.defaultMapperForLanguage,
    versionStatus: contensis_core_api_1.defaultMapperForLatestVersionStatus,
    pageIndex: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
    pageSize: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
};
class EntryOperations {
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
    }
    get(idOrOptions) {
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/entries/:id', { language: null, versionStatus: null, version: null })
            .addOptions(idOrOptions, 'id')
            .setParams(this.contensisClient.getParams())
            .addMappers(getMappers)
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    list(contentTypeIdOrOptions) {
        let urlTemplate = '/api/management/projects/:projectId/contenttypes/:contentTypeId/entries';
        if (!contentTypeIdOrOptions || (!contensis_core_api_1.isString(contentTypeIdOrOptions) && !contentTypeIdOrOptions.contentTypeId)) {
            urlTemplate = defaultListUrl;
        }
        let url = contensis_core_api_1.UrlBuilder.create(urlTemplate, { language: null, versionStatus: null, pageIndex: null, pageSize: null, order: null })
            .addOptions(contentTypeIdOrOptions, 'contentTypeId')
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    search(query) {
        if (!query) {
            return new Promise((resolve) => { resolve(null); });
        }
        let managementQuery = query instanceof contensis_core_api_1.ManagementQuery ? query : null;
        // use duck-typing for backwards compatibility pre v2.0.7
        if (managementQuery !== null || !!query.where || !!query.orderBy) {
            return this.searchUsingManagementQuery(managementQuery || query);
        }
        let zenqlQuery = query instanceof contensis_core_api_1.ManagementZenqlQuery ? query : null;
        if (zenqlQuery === null) {
            if (typeof query === 'string') {
                zenqlQuery = new contensis_core_api_1.ManagementZenqlQuery(query);
            }
            else {
                throw new Error('A valid query needs to be specified.');
            }
        }
        let params = this.contensisClient.getParams();
        let pageSize = params.pageSize || 25;
        let pageIndex = params.pageIndex || 0;
        pageSize = zenqlQuery.pageSize || pageSize;
        pageIndex = zenqlQuery.pageIndex || pageIndex;
        let includeArchived = zenqlQuery.includeArchived ? true : null;
        let includeDeleted = zenqlQuery.includeDeleted ? true : null;
        let { clientType, clientDetails, projectId, language, responseHandler, rootUrl, versionStatus } = params, requestParams = tslib_1.__rest(params, ["clientType", "clientDetails", "projectId", "language", "responseHandler", "rootUrl", "versionStatus"]);
        let payload = Object.assign({}, requestParams, { includeArchived,
            includeDeleted,
            pageSize,
            pageIndex, zenql: zenqlQuery.zenql });
        let url = contensis_core_api_1.UrlBuilder.create(defaultListUrl, Object.assign({}, payload))
            .setParams(Object.assign({}, payload, { projectId }))
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                method: 'GET',
                headers: this.contensisClient.getHeaders(),
            });
        });
    }
    create(entry) {
        if (!entry) {
            throw new Error('A valid entry needs to be specified.');
        }
        if (!entry.sys || (!entry.sys.contentTypeId && !entry.sys.dataFormat)) {
            throw new Error('A valid entry content type id or data format value needs to be specified.');
        }
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/entries', {})
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(entry)
            });
        });
    }
    update(entry) {
        if (!entry) {
            throw new Error('A valid entry needs to be specified.');
        }
        if (!entry.sys || !entry.sys.id) {
            throw new Error('A valid entry id value needs to be specified.');
        }
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/entries/:id', {})
            .addOptions(entry.sys.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT',
                body: JSON.stringify(entry)
            });
        });
    }
    getUsage(idOrOptions) {
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/entries/:id/usage', { language: null, versionStatus: null, version: null, pageIndex: null, pageSize: null })
            .addOptions(idOrOptions, 'id')
            .setParams(this.contensisClient.getParams())
            .addMappers(usageListMappers)
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    createAsset(asset, assetFilePath, parentNodePath) {
        throw new Error('This function can only be called in class EntryOperationsForServer.');
    }
    updateAsset(asset, assetFilePath) {
        throw new Error('This function can only be called in class EntryOperationsForServer.');
    }
    delete(id, languages = null, permanent = false) {
        if (!id) {
            throw new Error('A valid id needs to be specified.');
        }
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/entries/:id', {
            language: null,
            permanent: null,
        })
            .addOptions(id, 'id')
            .addOptions(!!languages && languages.length > 0 ? languages.join(',') : null, 'language')
            .addOptions(permanent ? 'true' : null, 'permanent')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'DELETE'
            });
        });
    }
    invokeWorkflow(entry, event, data = null) {
        if (!entry) {
            throw new Error('A valid entry needs to be specified.');
        }
        if (!entry.sys || !entry.sys.id) {
            throw new Error('A valid entry id value needs to be specified.');
        }
        if (!entry.sys.language) {
            throw new Error('A valid entry language value needs to be specified.');
        }
        if (!entry.sys.version || !entry.sys.version.versionNo) {
            throw new Error('A valid entry version number value needs to be specified.');
        }
        if (!event) {
            throw new Error('A valid event needs to be specified.');
        }
        let workflowTrigger = {
            language: entry.sys.language,
            version: entry.sys.version.versionNo,
            event,
            data
        };
        return this.invokeWorkflowByTrigger(entry, workflowTrigger);
    }
    invokeWorkflowByTrigger(entry, workflowTrigger) {
        if (!entry) {
            throw new Error('A valid entry needs to be specified.');
        }
        if (!entry.sys || !entry.sys.id) {
            throw new Error('A valid entry id value needs to be specified.');
        }
        if (!workflowTrigger) {
            throw new Error('A valid workflow trigger needs to be specified.');
        }
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/entries/:id/workflow/events', {})
            .addOptions(entry.sys.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(workflowTrigger)
            });
        });
    }
    searchUsingManagementQuery(query) {
        if (!query) {
            return new Promise((resolve) => { resolve(null); });
        }
        let managementQuery = query;
        let params = this.contensisClient.getParams();
        let pageSize = query.pageSize || params.pageSize;
        let pageIndex = query.pageIndex || 0;
        let orderBy = (managementQuery.orderBy && (managementQuery.orderBy._items || managementQuery.orderBy));
        let includeArchived = managementQuery.includeArchived ? true : null;
        let includeDeleted = managementQuery.includeDeleted ? true : null;
        let { clientType, clientDetails, projectId, language, responseHandler, rootUrl, versionStatus } = params, requestParams = tslib_1.__rest(params, ["clientType", "clientDetails", "projectId", "language", "responseHandler", "rootUrl", "versionStatus"]);
        let payload = Object.assign({}, requestParams, { includeArchived,
            includeDeleted,
            pageSize,
            pageIndex, where: JSON.stringify(query.where) });
        if (managementQuery.orderBy && (!Array.isArray(managementQuery.orderBy) || managementQuery.orderBy.length > 0)) {
            payload['orderBy'] = JSON.stringify(orderBy);
        }
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/entries/search', Object.assign({}, payload))
            .setParams(Object.assign({}, payload, { projectId }))
            .toUrl();
        let absoluteUrl = (!params.rootUrl || params.rootUrl === '/') ? url : params.rootUrl + url;
        if (contensis_core_api_1.isBrowser() && contensis_core_api_1.isIE() && absoluteUrl.length > 2083) {
            return this.searchUsingPost(query);
        }
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                method: 'GET',
                headers: this.contensisClient.getHeaders(),
            });
        });
    }
    searchUsingPost(query) {
        if (!query) {
            return new Promise((resolve) => { resolve(null); });
        }
        let params = this.contensisClient.getParams();
        query.pageSize = query.pageSize || params.pageSize;
        query.pageIndex = query.pageIndex || 0;
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/entries/search')
            .setParams(params)
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                method: 'POST',
                headers: this.contensisClient.getHeaders(),
                body: JSON.stringify(query)
            });
        });
    }
}
exports.EntryOperations = EntryOperations;
