import { defaultMapperForLatestVersionStatus, UrlBuilder } from 'contensis-core-api';
let getMappers = {
    versionStatus: defaultMapperForLatestVersionStatus,
    version: (value) => (!!value) ? value : null
};
let listMappers = {
    dataFormat: (value) => (!!value) ? value : null,
    versionStatus: defaultMapperForLatestVersionStatus
};
export class ContentTypeOperations {
    httpClient;
    contensisClient;
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
    }
    get(idOrOptions) {
        let url = UrlBuilder.create('/api/management/projects/:projectId/contenttypes/:id', { versionStatus: null, version: null })
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
    list(options = null) {
        let url = UrlBuilder.create('/api/management/projects/:projectId/contenttypes', { dataFormat: null, versionStatus: null })
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
    create(contentType) {
        if (!contentType) {
            throw new Error('A valid content type needs to be specified.');
        }
        let url = UrlBuilder.create('/api/management/projects/:projectId/contenttypes', {})
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(contentType)
            });
        });
    }
    update(contentType) {
        if (!contentType) {
            throw new Error('A valid content type needs to be specified.');
        }
        if (!contentType.id) {
            throw new Error('A valid content type id value needs to be specified.');
        }
        let url = UrlBuilder.create('/api/management/projects/:projectId/contenttypes/:id', {})
            .addOptions(contentType.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT',
                body: JSON.stringify(contentType)
            });
        });
    }
    delete(id) {
        if (!id) {
            throw new Error('A valid id needs to be specified.');
        }
        let url = UrlBuilder.create('/api/management/projects/:projectId/contenttypes/:id', {})
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
    invokeWorkflow(contentType, event, data = null) {
        if (!contentType) {
            throw new Error('A valid content type needs to be specified.');
        }
        if (!contentType.id) {
            throw new Error('A valid content type id value needs to be specified.');
        }
        if (!contentType.defaultLanguage) {
            throw new Error('A valid content type default language value needs to be specified.');
        }
        if (!contentType.version || !contentType.version.versionNo) {
            throw new Error('A valid content type version number value needs to be specified.');
        }
        if (!event) {
            throw new Error('A valid event needs to be specified.');
        }
        let workflowTrigger = {
            language: contentType.defaultLanguage,
            version: contentType.version.versionNo,
            event,
            data
        };
        let url = UrlBuilder.create('/api/management/projects/:projectId/contenttypes/:id/workflow/events', {})
            .addOptions(contentType.id, 'id')
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
}
