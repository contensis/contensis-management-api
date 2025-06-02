import {
    ClientParams,
    defaultMapperForLanguage,
    IHttpClient,
    MapperFn,
    PagedList,
    UrlBuilder
} from 'contensis-core-api';
import {
    ContensisClient,
    ICreateTagGroup,
    ITagGroupOperations,
    IUpdateTagGroup,
    TagGroup,
    TagGroupListOptions,
    TagGroupUsageInfo,
    TagGroupUsageOptions,
} from '../models';
import { isString } from '../utils';

const listMappers: { [key: string]: MapperFn } = {
    language: (value: string) => isString(value) ? value : null,
    order: (value: string[]) => (value && value.length > 0) ? value : null,
    pageIndex: (value: number, options: TagGroupListOptions, params: ClientParams) =>
        (options?.pageOptions?.pageIndex) || (params.pageIndex),
    pageSize: (value: number, options: TagGroupListOptions, params: ClientParams) =>
        (options?.pageOptions?.pageSize) || (params.pageSize),
    q: (value: string) => isString(value) ? value : null,
};

const usageListMappers: { [key: string]: MapperFn } = {
    pageIndex: (value: number, options: TagGroupUsageOptions, params: ClientParams) =>
        (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
    pageSize: (value: number, options: TagGroupUsageOptions, params: ClientParams) =>
        (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
};

export class TagGroupOperations implements ITagGroupOperations {
    constructor(protected httpClient: IHttpClient, protected contensisClient: ContensisClient) {
    }

    async get(id: string): Promise<TagGroup> {
        if (!isString(id)) {
            throw new Error('A valid tag group id needs to be specified.');
        }

        const url = UrlBuilder.create('/api/management/projects/:projectId/taggroups/:id', {})
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        await this.contensisClient.ensureBearerToken();
        return await this.httpClient.request<TagGroup>(url, {
            headers: this.contensisClient.getHeaders()
        });
    }

    async list(options?: TagGroupListOptions): Promise<PagedList<TagGroup>> {

        const url = UrlBuilder.create('/api/management/projects/:projectId/taggroups',
            { language: null, order: null, pageIndex: null, pageSize: null, q: null })
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();

        await this.contensisClient.ensureBearerToken();
        return await this.httpClient.request<PagedList<TagGroup>>(url, {
            headers: this.contensisClient.getHeaders()
        });
    }

    async create(group: ICreateTagGroup): Promise<TagGroup> {
        if (!group) {
            throw new Error('A valid tag group needs to be specified.');
        }

        if (!group.id || !group.name) {
            throw new Error('A valid tag group id and name needs to be specified.');
        }

        const url = UrlBuilder.create('/api/management/projects/:projectId/taggroups',
            {})
            .setParams(this.contensisClient.getParams())
            .toUrl();

        await this.contensisClient.ensureBearerToken();
        return await this.httpClient.request<TagGroup>(url, {
            headers: this.contensisClient.getHeaders(),
            method: 'POST',
            body: JSON.stringify(group)
        });
    }

    async update(group: IUpdateTagGroup): Promise<TagGroup> {
        if (!group) {
            throw new Error('A valid tag group needs to be specified.');
        }

        if (!group.id) {
            throw new Error('A valid tag group id value needs to be specified.');
        }

        const url = UrlBuilder.create('/api/management/projects/:projectId/taggroups/:id',
            {})
            .addOptions(group.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        await this.contensisClient.ensureBearerToken();
        return await this.httpClient.request<TagGroup>(url, {
            headers: this.contensisClient.getHeaders(),
            method: 'PUT',
            body: JSON.stringify(group)
        });
    }

    async getUsage(idOrOptions: string | TagGroupUsageOptions): Promise<PagedList<TagGroupUsageInfo>> {
        const url = UrlBuilder.create('/api/management/projects/:projectId/taggroups/:id/usage',
            { pageIndex: null, pageSize: null })
            .addOptions(idOrOptions, 'id')
            .setParams(this.contensisClient.getParams())
            .addMappers(usageListMappers)
            .toUrl();

        await this.contensisClient.ensureBearerToken();
        return await this.httpClient.request<PagedList<TagGroupUsageInfo>>(url, {
            headers: this.contensisClient.getHeaders()
        });
    }

    async delete(id: string): Promise<void> {
        if (!id) {
            throw new Error('A valid tag group id needs to be specified.');
        }

        const url = UrlBuilder.create('/api/management/projects/:projectId/taggroups/:id', {})
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        await this.contensisClient.ensureBearerToken();

        return await this.httpClient.request<void>(url, {
            headers: this.contensisClient.getHeaders(),
            method: 'DELETE'
        });

    }

}
