import { UrlBuilder, } from 'contensis-core-api';
let listMappers = {
    pageIndex: (value, options, params) => (options && options.pageIndex) || params.pageIndex,
    pageSize: (value, options, params) => (options && options.pageSize) || params.pageSize,
};
export class RedirectOperations {
    httpClient;
    contensisClient;
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
    }
    get(id) {
        let url = UrlBuilder.create('/api/management/projects/:projectId/redirects/:id', {})
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
            });
        });
    }
    list(options = null) {
        let url = UrlBuilder.create('/api/management/projects/:projectId/redirects', { pageIndex: null, pageSize: null })
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
            });
        });
    }
    create(redirect) {
        this.ensureRedirectIsValid(redirect);
        let url = UrlBuilder.create('/api/management/projects/:projectId/redirects', {})
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(redirect),
            });
        });
    }
    update(redirect) {
        this.ensureRedirectIsValid(redirect, true);
        let url = UrlBuilder.create('/api/management/projects/:projectId/redirects/:id', {})
            .addOptions(redirect.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PATCH',
                body: JSON.stringify(redirect),
            });
        });
    }
    delete(id) {
        if (!id) {
            throw new Error('A valid id needs to be specified.');
        }
        let url = UrlBuilder.create('/api/management/projects/:projectId/redirects/:id', {})
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'DELETE',
            });
        });
    }
    ensureRedirectIsValid(redirect, needsId = false) {
        if (!redirect) {
            throw new Error('A valid redirect needs to be specified.');
        }
        if (needsId && !redirect.id) {
            throw new Error('A valid redirect id value needs to be specified.');
        }
        if (redirect.appendSourcePathToDestination === undefined ||
            typeof redirect.appendSourcePathToDestination !== 'boolean') {
            throw new Error('A valid appendSourcePathToDestination value needs to be specified.');
        }
        if (!redirect.statusCode ||
            ![301, 302, 303, 307].includes(redirect.statusCode)) {
            throw new Error('A valid statusCode value needs to be specified.');
        }
        if (!redirect.destination || typeof redirect.destination !== 'string') {
            throw new Error('A valid destination value needs to be specified.');
        }
        if (!redirect.match ||
            !['beginsWith', 'exactMatch', 'regex'].includes(redirect.match.type) ||
            !redirect.match.value ||
            typeof redirect.match.value !== 'string') {
            throw new Error('A valid match value needs to be specified.');
        }
        if (!redirect.sourceDomain || typeof redirect.sourceDomain !== 'string') {
            throw new Error('A valid sourceDomain value needs to be specified.');
        }
    }
}
