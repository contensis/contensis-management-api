import { UrlBuilder } from 'contensis-core-api';
let listMappers = {
    pageIndex: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
    pageSize: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
    order: (value) => (value && value.length > 0) ? value : null,
};
export class GroupOperations {
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
        if (!this.httpClient || !this.contensisClient) {
            throw new Error('The class UserOperations was not initialised correctly.');
        }
    }
    getById(groupId) {
        return this.getGroup(groupId);
    }
    getByName(groupName) {
        return this.getGroup(groupName);
    }
    list(options) {
        let url = UrlBuilder.create('/api/management/security/groups', !options ? {} : { q: null, pageIndex: null, pageSize: null, order: null })
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    getGroup(idOrName) {
        let url = UrlBuilder.create('/api/management/security/groups/:idOrName', {})
            .addOptions(idOrName, 'idOrName')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
}
