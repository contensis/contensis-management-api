import {
    ContensisClient, ICreateNode, INodeOperations, IUpdateNode, Node, NodeGetChildrenOptions
} from '../models';
import {
    defaultMapperForLanguage, IHttpClient, UrlBuilder
} from 'contensis-core-api';

let nodeDefaultOptionsMappers = {
    language: defaultMapperForLanguage,
};

export class NodeOperations implements INodeOperations {

    constructor(private httpClient: IHttpClient, private contensisClient: ContensisClient) {
        if (!this.httpClient || !this.contensisClient) {
            throw new Error('The class NodeOperations was not initialised correctly.');
        }
    }

    getRoot(): Promise<Node> {
        let url = UrlBuilder.create(
            '/api/management/projects/:projectId/nodes/root',
            {})
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<Node>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    get(id: string): Promise<Node> {
        let url = UrlBuilder.create(
            '/api/management/projects/:projectId/nodes/:id',
            {})
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<Node>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    getByEntryId(entryId: string): Promise<Node[]> {
        let url = UrlBuilder.create(
            '/api/management/projects/:projectId/nodes',
            { entryId: null })
            .addOptions(entryId, 'entryId')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<Node[]>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    getChildren(idOrOptions: string | NodeGetChildrenOptions): Promise<Node[]> {
        let url = UrlBuilder.create('/api/management/projects/:projectId/nodes/:id/children',
            { language: null })
            .addOptions(idOrOptions, 'id')
            .setParams(this.contensisClient.getParams())
            .addMappers(nodeDefaultOptionsMappers)
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<Node[]>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    create(node: ICreateNode): Promise<Node> {
        if (!node) {
            throw new Error('A valid node needs to be specified.');
        }

        if (!node.parentId) {
            throw new Error('A valid node parent id value needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/projects/:projectId/nodes/:parentNodeId/children',
            {})
            .addOptions(node.parentId, 'parentNodeId')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<Node>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(node)
            });
        });
    }

    update(node: IUpdateNode): Promise<Node> {
        if (!node) {
            throw new Error('A valid node needs to be specified.');
        }

        if (!node.id) {
            throw new Error('A valid node id value needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/projects/:projectId/nodes/:id',
            {})
            .addOptions(node.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<Node>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT',
                body: JSON.stringify(node)
            });
        });
    }

    delete(id: string): Promise<void> {
        if (!id) {
            throw new Error('A valid id needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/projects/:projectId/nodes/:id',
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

    setChildrenOrder(id: string, childrenIds: string[], language?: string): Promise<void> {
        if (!id) {
            throw new Error('A valid id needs to be specified.');
        }

        if (!childrenIds || childrenIds.length === 0) {
            throw new Error('The children ids need to be specified.');
        }

        let url = UrlBuilder.create('/api/management/projects/:projectId/nodes/:id/children/order',
            { language: null })
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request<void>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT',
                body: JSON.stringify(childrenIds)
            });
        });
    }

    deleteChildrenOrder(id: string, language?: string): Promise<void> {
        if (!id) {
            throw new Error('A valid id needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/projects/:projectId/nodes/:id/children/order',
            { language: null })
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
