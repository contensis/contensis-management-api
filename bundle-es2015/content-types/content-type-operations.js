import { UrlBuilder } from 'contensis-core-api';
export class ContentTypeOperations {
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
    }
    get(contentTypeId) {
        let url = UrlBuilder.create('/api/management/projects/:projectId/contentTypes/:contentTypeId')
            .addOptions(contentTypeId, 'contentTypeId')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    list() {
        let url = UrlBuilder.create('/api/management/projects/:projectId/contentTypes', { language: null, versionStatus: null, linkDepth: null, order: null, fields: null, pageIndex: null, pageSize: null })
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
}
