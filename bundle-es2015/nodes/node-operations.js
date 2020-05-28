import { defaultMapperForLanguage, UrlBuilder } from 'contensis-core-api';
let nodeDefaultOptionsMappers = {
    language: defaultMapperForLanguage,
};
export class NodeOperations {
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
        if (!this.httpClient || !this.contensisClient) {
            throw new Error('The class NodeOperations was not initialised correctly.');
        }
    }
    getRoot() {
        let url = UrlBuilder.create('/api/management/projects/:projectId/nodes/root', {})
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    get(id) {
        let url = UrlBuilder.create('/api/management/projects/:projectId/nodes/:id', {})
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    getByEntryId(entryId) {
        let url = UrlBuilder.create('/api/management/projects/:projectId/nodes', { entryId: null })
            .addOptions(entryId, 'entryId')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    getChildren(idOrOptions) {
        let url = UrlBuilder.create('/api/management/projects/:projectId/nodes/:id/children', { language: null })
            .addOptions(idOrOptions, 'id')
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeDefaultOptionsMappers)
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    create(node) {
        if (!node) {
            throw new Error('A valid node needs to be specified.');
        }
        if (!node.parentId) {
            throw new Error('A valid node parent id value needs to be specified.');
        }
        let url = UrlBuilder.create('/api/management/projects/:projectId/nodes/:parentNodeId/children', {})
            .addOptions(node.parentId, 'parentNodeId')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(node)
            });
        });
    }
    update(node) {
        if (!node) {
            throw new Error('A valid node needs to be specified.');
        }
        if (!node.id) {
            throw new Error('A valid node id value needs to be specified.');
        }
        let url = UrlBuilder.create('/api/management/projects/:projectId/nodes/:id', {})
            .addOptions(node.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT',
                body: JSON.stringify(node)
            });
        });
    }
    delete(id) {
        if (!id) {
            throw new Error('A valid id needs to be specified.');
        }
        let url = UrlBuilder.create('/api/management/projects/:projectId/nodes/:id', {})
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'DELETE'
            });
        });
    }
    setChildrenOrder(id, childrenIds, language) {
        if (!id) {
            throw new Error('A valid id needs to be specified.');
        }
        if (!childrenIds || childrenIds.length === 0) {
            throw new Error('The children ids need to be specified.');
        }
        let url = UrlBuilder.create('/api/management/projects/:projectId/nodes/:id/children/order', { language: null })
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT',
                body: JSON.stringify(childrenIds)
            });
        });
    }
    deleteChildrenOrder(id, language) {
        if (!id) {
            throw new Error('A valid id needs to be specified.');
        }
        let url = UrlBuilder.create('/api/management/projects/:projectId/nodes/:id/children/order', { language: null })
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'DELETE'
            });
        });
    }
}
