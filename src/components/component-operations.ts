import { ContensisClient, ComponentGetOptions, IComponentOperations, WorkflowTrigger } from '../models';
import { Component, defaultMapperForLatestVersionStatus, IHttpClient, MapperFn, UrlBuilder, VersionStatus } from 'contensis-core-api';

let getMappers: { [key: string]: MapperFn } = {
    versionStatus: defaultMapperForLatestVersionStatus,
    version: (value: number) => (!!value) ? value : null
};

let listMappers: { [key: string]: MapperFn } = {
    dataFormat: (value: string) => (!!value) ? value : null,
    versionStatus: defaultMapperForLatestVersionStatus
};

export class ComponentOperations implements IComponentOperations {
    constructor(private httpClient: IHttpClient, private contensisClient: ContensisClient) {

    }

    get(idOrOptions: string | ComponentGetOptions): Promise<Component> {
        let url = UrlBuilder.create('/api/management/projects/:projectId/components/:id',
            { versionStatus: null, version: null })
            .addOptions(idOrOptions, 'id')
            .setParams(this.contensisClient.getParams())
            .addMappers(getMappers)
            .toUrl();

        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<Component>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    list(versionStatus: VersionStatus = null): Promise<Component[]> {
        let url = UrlBuilder.create('/api/management/projects/:projectId/components',
            { versionStatus: null })
            .addOptions(versionStatus, 'versionStatus')
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();

        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<Component[]>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    create(component: Component): Promise<Component> {
        if (!component) {
            throw new Error('A valid component needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/projects/:projectId/components',
            {})
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<Component>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(component)
            });
        });
    }

    update(component: Component): Promise<Component> {
        if (!component) {
            throw new Error('A valid component needs to be specified.');
        }

        if (!component.id) {
            throw new Error('A valid component id value needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/projects/:projectId/components/:id',
            {})
            .addOptions(component.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<Component>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT',
                body: JSON.stringify(component)
            });
        });
    }

    delete(id: string): Promise<void> {
        if (!id) {
            throw new Error('A valid id needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/projects/:projectId/components/:id',
            {})
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<void>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'DELETE'
            });
        });
    }

    invokeWorkflow(component: Component, event: string, data: any = null): Promise<Component> {
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

        let workflowTrigger: WorkflowTrigger = {
            version: component.version.versionNo,
            event,
            data
        };

        let url = UrlBuilder.create('/api/management/projects/:projectId/components/:id/workflow/events',
            {})
            .addOptions(component.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<Component>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(workflowTrigger)
            });
        });
    }
}
