"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionOperations = void 0;
const contensis_core_api_1 = require("contensis-core-api");
let getPermissionsMappers = {
    userId: (value) => (!!value) ? value : null,
    language: contensis_core_api_1.defaultMapperForLanguage
};
class PermissionOperations {
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
    }
    getPermissions(options) {
        if (!options) {
            throw new Error('Valid options need to be specified.');
        }
        if (!options.resourceType) {
            throw new Error('A valid resource type needs to be specified.');
        }
        if (!options.userId) {
            throw new Error('A valid user id needs to be specified.');
        }
        let urlTemplate = '/api/management/projects/:projectId/security/permissions/:resourceType/:resourceId';
        if (!options.resourceId) {
            urlTemplate = '/api/management/projects/:projectId/security/permissions/:resourceType';
        }
        let url = contensis_core_api_1.UrlBuilder.create(urlTemplate, { userId: null, language: null })
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(getPermissionsMappers)
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    getAuthorizationForAction(options) {
        if (!options) {
            throw new Error('Valid options need to be specified.');
        }
        if (!options.resourceType) {
            throw new Error('A valid resource type needs to be specified.');
        }
        if (!options.userId) {
            throw new Error('A valid user id needs to be specified.');
        }
        if (!options.actionName) {
            throw new Error('A valid action name needs to be specified.');
        }
        let urlTemplate = '/api/management/projects/:projectId/security/permissions/:resourceType/:resourceId/actions/:actionName';
        if (!options.resourceId) {
            urlTemplate = '/api/management/projects/:projectId/security/permissions/:resourceType/actions/:actionName';
        }
        let url = contensis_core_api_1.UrlBuilder.create(urlTemplate, { userId: null, language: null })
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(getPermissionsMappers)
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
}
exports.PermissionOperations = PermissionOperations;
