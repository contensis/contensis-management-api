"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectOperations = void 0;
const contensis_core_api_1 = require("contensis-core-api");
class ProjectOperations {
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
    }
    get(id = null) {
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId')
            .addOptions(id, 'projectId')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    list() {
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects', {})
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    create(project) {
        if (!project) {
            throw new Error('A valid project needs to be specified.');
        }
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects', {})
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(project)
            });
        });
    }
    update(project) {
        if (!project) {
            throw new Error('A valid project needs to be specified.');
        }
        if (!project.id) {
            throw new Error('A valid project id value needs to be specified.');
        }
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:id', {})
            .addOptions(project.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT',
                body: JSON.stringify(project)
            });
        });
    }
    delete(id) {
        if (!id) {
            throw new Error('A valid id needs to be specified.');
        }
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:id', {})
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
exports.ProjectOperations = ProjectOperations;
