import { IContentTypeOperations, ContensisClient } from '../models';
import { ContentType, IHttpClient, UrlBuilder } from 'contensis-core-api';

export class ContentTypeOperations implements IContentTypeOperations {
    constructor(private httpClient: IHttpClient, private contensisClient: ContensisClient) {

    }

    get(contentTypeId: string): Promise<ContentType> {
        let url = UrlBuilder.create('/api/management/projects/:projectId/contentTypes/:contentTypeId')
            .addOptions(contentTypeId, 'contentTypeId')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<ContentType>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    list(): Promise<ContentType[]> {
        let url = UrlBuilder.create('/api/management/projects/:projectId/contentTypes',
            { language: null, versionStatus: null, linkDepth: null, order: null, fields: null, pageIndex: null, pageSize: null })
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<ContentType[]>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
}
