"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleOperations = void 0;
const contensis_core_api_1 = require("contensis-core-api");
let listMappers = {
    pageIndex: (value, options, params) => (options && options.pageIndex) || (params.pageIndex),
    pageSize: (value, options, params) => (options && options.pageSize) || (params.pageSize)
};
class RoleOperations {
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
    }
    get(id) {
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/security/roles/:id', {})
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
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/security/roles', { pageIndex: null, pageSize: null })
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
        this.ensureRoleIsValid(role);
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/security/roles', {})
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
        this.ensureRoleIsValid(role, true);
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/security/roles/:id', {})
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
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/security/roles/:id', {})
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
    ensureRoleIsValid(role, needsId = false) {
        if (!role) {
            throw new Error('A valid role needs to be specified.');
        }
        if (needsId && !role.id) {
            throw new Error('A valid role id value needs to be specified.');
        }
        if (!role.assignments) {
            role.assignments = {};
        }
    }
}
exports.RoleOperations = RoleOperations;
