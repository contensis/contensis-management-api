import { ContensisClient, IProjectOperations } from '../models';
import { IHttpClient, Project, UrlBuilder } from 'contensis-core-api';

export class ProjectOperations implements IProjectOperations {
    constructor(private httpClient: IHttpClient, private contensisClient: ContensisClient) {

    }

    get(id: string = null): Promise<Project> {
        let url = UrlBuilder.create('/api/management/projects/:projectId')
            .addOptions(id, 'projectId')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<Project>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    list(): Promise<Project[]> {
        let url = UrlBuilder.create('/api/management/projects',
            {})
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<Project[]>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    create(project: Project): Promise<Project> {
        if (!project) {
            throw new Error('A valid project needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/projects',
            {})
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<Project>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(project)
            });
        });
    }

    update(project: Project): Promise<Project> {
        if (!project) {
            throw new Error('A valid project needs to be specified.');
        }

        if (!project.id) {
            throw new Error('A valid project id value needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/projects/:id',
            {})
            .addOptions(project.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<Project>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT',
                body: JSON.stringify(project)
            });
        });
    }

    delete(id: string): Promise<void> {
        if (!id) {
            throw new Error('A valid id needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/projects/:id',
            {})
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<void>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'DELETE'
            });
        });
    }

}
