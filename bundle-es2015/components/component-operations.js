import { defaultMapperForLatestVersionStatus, UrlBuilder } from 'contensis-core-api';
let getMappers = {
    versionStatus: defaultMapperForLatestVersionStatus,
    version: (value) => (!!value) ? value : null
};
let listMappers = {
    dataFormat: (value) => (!!value) ? value : null,
    versionStatus: defaultMapperForLatestVersionStatus
};
export class ComponentOperations {
    httpClient;
    contensisClient;
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
    }
    get(idOrOptions) {
        let url = UrlBuilder.create('/api/management/projects/:projectId/components/:id', { versionStatus: null, version: null })
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
    list(versionStatus = null) {
        let url = UrlBuilder.create('/api/management/projects/:projectId/components', { versionStatus: null })
            .addOptions(versionStatus, 'versionStatus')
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    create(component) {
        if (!component) {
            throw new Error('A valid component needs to be specified.');
        }
        let url = UrlBuilder.create('/api/management/projects/:projectId/components', {})
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(component)
            });
        });
    }
    update(component) {
        if (!component) {
            throw new Error('A valid component needs to be specified.');
        }
        if (!component.id) {
            throw new Error('A valid component id value needs to be specified.');
        }
        let url = UrlBuilder.create('/api/management/projects/:projectId/components/:id', {})
            .addOptions(component.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT',
                body: JSON.stringify(component)
            });
        });
    }
    delete(id) {
        if (!id) {
            throw new Error('A valid id needs to be specified.');
        }
        let url = UrlBuilder.create('/api/management/projects/:projectId/components/:id', {})
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
    invokeWorkflow(component, event, data = null) {
        if (!component) {
            throw new Error('A valid component needs to be specified.');
        }
        if (!component.id) {
            throw new Error('A valid component id value needs to be specified.');
        }
        if (!component.version || !component.version.versionNo) {
            throw new Error('A valid component version number value needs to be specified.');
        }
        if (!event) {
            throw new Error('A valid event needs to be specified.');
        }
        let workflowTrigger = {
            version: component.version.versionNo,
            event,
            data
        };
        let url = UrlBuilder.create('/api/management/projects/:projectId/components/:id/workflow/events', {})
            .addOptions(component.id, 'id')
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
