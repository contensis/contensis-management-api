"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contensis_core_api_1 = require("contensis-core-api");
const FormData = require("form-data");
const fs = require("fs");
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
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    list(contentTypeIdOrOptions) {
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/contentTypes/:contentTypeId/entries', { language: null, versionStatus: null, pageIndex: null, pageSize: null, order: null })
            .addOptions(contentTypeIdOrOptions, 'contentTypeId')
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
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
        return this.contensisClient.ensureAuthenticationToken().then(() => {
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
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT',
                body: JSON.stringify(entry)
            });
        });
    }
    createAsset(asset, assetFilePath, parentNodePath) {
        if (!asset) {
            throw new Error('A valid asset needs to be specified.');
        }
        if (!assetFilePath) {
            throw new Error('A valid asset file path needs to be specified.');
        }
        if (!parentNodePath) {
            throw new Error('A valid parent node path needs to be specified.');
        }
        if (!asset.sys || !asset.sys.dataFormat) {
            asset.sys = asset.sys || {};
            asset.sys.dataFormat = 'asset';
        }
        let form = new FormData();
        form.append('file', fs.createReadStream(assetFilePath));
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/assets', {})
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: form.getHeaders(this.contensisClient.getHeaders(null)),
                method: 'POST',
                body: form
            })
                .then((assetUploads) => {
                if (!assetUploads || assetUploads.length === 0) {
                    throw new Error('The asset file could not be uploaded.');
                }
                let sysAssetFile = {
                    fileId: assetUploads[0].fileId,
                    parentNodePath: parentNodePath
                };
                asset.sysAssetFile = sysAssetFile;
                return this.create(asset);
            });
        });
    }
    updateAsset(asset, assetFilePath) {
        if (!asset) {
            throw new Error('A valid asset needs to be specified.');
        }
        if (!assetFilePath) {
            return this.update(asset);
        }
        let form = new FormData();
        form.append('file', fs.createReadStream(assetFilePath));
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/assets', {})
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: form.getHeaders(this.contensisClient.getHeaders(null)),
                method: 'POST',
                body: form
            })
                .then((assetUploads) => {
                if (!assetUploads || assetUploads.length === 0) {
                    throw new Error('The asset file could not be uploaded.');
                }
                let sysAssetFile = {
                    fileId: assetUploads[0].fileId
                };
                asset.sysAssetFile = sysAssetFile;
                return this.update(asset);
            });
        });
    }
    delete(id, languages = null) {
        if (!id) {
            throw new Error('A valid id needs to be specified.');
        }
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/entries/:id', { language: null })
            .addOptions(id, 'id')
            .addOptions(!!languages && languages.length > 0 ? languages.join(',') : null, 'language')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
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
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(workflowTrigger)
            });
        });
    }
}
exports.EntryOperations = EntryOperations;
