import { defaultMapperForLanguage, defaultMapperForLatestVersionStatus, UrlBuilder } from 'contensis-core-api';
let getMappers = {
    language: defaultMapperForLanguage,
    versionStatus: defaultMapperForLatestVersionStatus,
    version: (value) => (!!value) ? value : null
};
let listMappers = {
    language: defaultMapperForLanguage,
    versionStatus: defaultMapperForLatestVersionStatus,
    pageIndex: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
    pageSize: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
    order: (value) => (value && value.length > 0) ? value : null,
};
export class EntryOperations {
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
    }
    get(idOrOptions) {
        let url = UrlBuilder.create('/api/management/projects/:projectId/entries/:id', { language: null, versionStatus: null, version: null })
            .addOptions(idOrOptions, 'id')
            .setParams(this.contensisClient.getParams())
            .addMappers(getMappers)
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    list(contentTypeIdOrOptions) {
        let url = UrlBuilder.create('/api/management/projects/:projectId/contentTypes/:contentTypeId/entries', { language: null, versionStatus: null, pageIndex: null, pageSize: null, order: null })
            .addOptions(contentTypeIdOrOptions, 'contentTypeId')
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();
        return this.httpClient.request(url);
    }
}
