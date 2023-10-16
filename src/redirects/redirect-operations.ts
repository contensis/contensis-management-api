import { ContensisClient, IRedirectOperations, Redirect } from '../models';
import { IHttpClient, UrlBuilder, PageOptions, MapperFn, ClientParams, PagedList } from 'contensis-core-api';

let listMappers: { [key: string]: MapperFn } = {
    pageIndex: (value: number, options: PageOptions, params: ClientParams) => (options && options.pageIndex) || (params.pageIndex),
    pageSize: (value: number, options: PageOptions, params: ClientParams) => (options && options.pageSize) || (params.pageSize)
};

export class RedirectOperations implements IRedirectOperations {
    constructor(private httpClient: IHttpClient, private contensisClient: ContensisClient) {}

    get(id: string): Promise<Redirect> {
        let url = UrlBuilder.create('/api/management/projects/:projectId/redirects/:id',
            {})
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<Redirect>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    list(options: PageOptions = null): Promise<PagedList<Redirect>> {
        let url = UrlBuilder.create('/api/management/projects/:projectId/redirects',
            { pageIndex: null, pageSize: null })
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<PagedList<Redirect>>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    create(redirect: Redirect): Promise<Redirect> {
        this.ensureRedirectIsValid(redirect);

        let url = UrlBuilder.create('/api/management/projects/:projectId/redirects',
            {})
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<Redirect>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(redirect)
            });
        });
    }

    update(redirect: Redirect): Promise<Redirect> {
        this.ensureRedirectIsValid(redirect, true);

        let url = UrlBuilder.create('/api/management/projects/:projectId/redirects/:id',
            {})
            .addOptions(redirect.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<Redirect>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PATCH',
                body: JSON.stringify(redirect)
            });
        });
    }

    delete(id: string): Promise<void> {
        if (!id) {
            throw new Error('A valid id needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/projects/:projectId/redirects/:id',
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

    private ensureRedirectIsValid(redirect: Redirect, needsId: boolean = false): void {
        if (!redirect) {
            throw new Error('A valid redirect needs to be specified.');
        }

        if (needsId && !redirect.id) {
            throw new Error('A valid redirect id value needs to be specified.');
        }

        if(redirect.appendSourcePathToDestination === undefined || typeof redirect.appendSourcePathToDestination !== 'boolean') {
            throw new Error('A valid appendSourcePathToDestination value needs to be specified.');
        }

        if(!redirect.statusCode || ![301,302,303,307].includes(redirect.statusCode)) {
            throw new Error('A valid statusCode value needs to be specified.');
        }

        if(!redirect.destination || typeof redirect.destination !== 'string') {
            throw new Error('A valid destination value needs to be specified.');
        }

        if(!redirect.match || !['beginsWith','exactMatch','regex'].includes(redirect.match.type) || !redirect.match.value || typeof redirect.match.value !== 'string') {
            throw new Error('A valid match value needs to be specified.');
        }

        if(!redirect.sourceDomain || typeof redirect.sourceDomain !== 'string') {
            throw new Error('A valid sourceDomain value needs to be specified.');
        }
    }
}
