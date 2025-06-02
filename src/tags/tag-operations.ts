import {
    ClientParams,
    defaultMapperForLanguage,
    defaultMapperForPublishedVersionStatus,
    IHttpClient,
    MapperFn,
    PagedList,
    UrlBuilder
} from 'contensis-core-api';
import {
    ContensisClient,
    IBulkDeletedTags,
    ICreateTag,
    ITagGroupOperations,
    ITagOperations,
    IUpdateTag,
    PagedUsageList,
    Tag,
    TagBulkDeleteOptions,
    TagGetByLabelOptions,
    TagListOptions,
    TagUsageInfo,
    TagUsageOptions,
} from '../models';
import { isString } from '../utils';
import { TagGroupOperations } from './tag-group-operations';

const getMappers: { [key: string]: MapperFn } = {
    language: defaultMapperForLanguage,
};

const listMappers: { [key: string]: MapperFn } = {
    language: defaultMapperForLanguage,
    order: (value: string[]) => (value && value.length > 0) ? value : null,
    pageIndex: (value: number, options: TagListOptions, params: ClientParams) =>
        (options?.pageOptions?.pageIndex) || (params.pageIndex),
    pageSize: (value: number, options: TagListOptions, params: ClientParams) =>
        (options?.pageOptions?.pageSize) || (params.pageSize),
    q: (value: string) => isString(value) ? value : null,
};

const usageListMappers: { [key: string]: MapperFn } = {
    language: defaultMapperForLanguage,
    pageIndex: (value: number, options: TagUsageOptions, params: ClientParams) =>
        (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
    pageSize: (value: number, options: TagUsageOptions, params: ClientParams) =>
        (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
    versionStatus: defaultMapperForPublishedVersionStatus,
};

export class TagOperations implements ITagOperations {
    groups: ITagGroupOperations;

    constructor(protected httpClient: IHttpClient, protected contensisClient: ContensisClient) {
        this.groups = new TagGroupOperations(httpClient, contensisClient);
    }

    async get(idOrOptions: string | TagGetByLabelOptions): Promise<Tag> {
        if (!idOrOptions) {
            throw new Error('A valid tag id needs to be specified.');
        }
        if (!isString(idOrOptions) &&
            (!idOrOptions.groupId || !isString(idOrOptions.label))) {
            throw new Error('A valid tag group id and label needs to be specified.');
        }

        const tagId = isString(idOrOptions) && idOrOptions;

        const urlTemplate = isString(idOrOptions)
            ? '/api/management/projects/:projectId/tags/:id'
            : '/api/management/projects/:projectId/taggroups/:groupId/tags';

        const urlBuilder = UrlBuilder.create(urlTemplate, { label: null, language: null });

        if (tagId) urlBuilder.addOptions(tagId, 'id');
        else urlBuilder.addOptions(idOrOptions);

        const url = urlBuilder
            .setParams(this.contensisClient.getParams())
            .addMappers(getMappers)
            .toUrl();

        await this.contensisClient.ensureBearerToken();
        return await this.httpClient.request<Tag>(url, {
            headers: this.contensisClient.getHeaders()
        });
    }

    async list(groupIdOrOptions?: string | TagListOptions): Promise<PagedList<Tag>> {
        const urlTemplate = (!groupIdOrOptions || !isString(groupIdOrOptions) &&
            (!groupIdOrOptions.groupId))
            ? '/api/management/projects/:projectId/tags'
            : '/api/management/projects/:projectId/taggroups/:groupId/tags';

        const url = UrlBuilder.create(urlTemplate,
            { language: null, order: null, pageIndex: null, pageSize: null, q: null })
            .addOptions(groupIdOrOptions, 'groupId')
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();

        await this.contensisClient.ensureBearerToken();
        return await this.httpClient.request<PagedList<Tag>>(url, {
            headers: this.contensisClient.getHeaders()
        });
    }

    async create(tag: ICreateTag): Promise<Tag> {
        if (!tag) {
            throw new Error('A valid tag needs to be specified.');
        }

        if (!tag.value || !tag.groupId || !tag.label) {
            throw new Error('A valid tag value, tag group id and label needs to be specified.');
        }

        const url = UrlBuilder.create('/api/management/projects/:projectId/tags',
            {})
            .setParams(this.contensisClient.getParams())
            .toUrl();

        await this.contensisClient.ensureBearerToken();
        return await this.httpClient.request<Tag>(url, {
            headers: this.contensisClient.getHeaders(),
            method: 'POST',
            body: JSON.stringify(tag)
        });
    }

    async update(tag: IUpdateTag): Promise<Tag> {
        if (!tag) {
            throw new Error('A valid tag needs to be specified.');
        }

        if (!tag.id) {
            throw new Error('A valid tag id value needs to be specified.');
        }

        const url = UrlBuilder.create('/api/management/projects/:projectId/tags/:id',
            {})
            .addOptions(tag.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        await this.contensisClient.ensureBearerToken();
        return await this.httpClient.request<Tag>(url, {
            headers: this.contensisClient.getHeaders(),
            method: 'PUT',
            body: JSON.stringify(tag)
        });
    }

    async getUsage(idOrOptions: string | TagUsageOptions): Promise<PagedUsageList<TagUsageInfo>> {
        const url = UrlBuilder.create('/api/management/projects/:projectId/tags/:id/usage',
            { language: null, pageIndex: null, pageSize: null, q: null, versionStatus: null })
            .addOptions(idOrOptions, 'id')
            .setParams(this.contensisClient.getParams())
            .addMappers(usageListMappers)
            .toUrl();

        await this.contensisClient.ensureBearerToken();
        return await this.httpClient.request<PagedUsageList<TagUsageInfo>>(url, {
            headers: this.contensisClient.getHeaders()
        });
    }

    // Include explicit overloads from ITagOperations interface to keep TypeScript happy solving ts(2416) // Type 'void | IBulkDeletedTags' is not assignable to type 'void'. Type 'IBulkDeletedTags' is not assignable to type 'void'.
    async delete(id: string, replacementTagId?: string): Promise<void>;
    async delete(options: TagBulkDeleteOptions, replacementTagId?: string): Promise<IBulkDeletedTags>;
    async delete(idOrOptions: string | TagBulkDeleteOptions, replacementTagId?: string): Promise<void | IBulkDeletedTags> {

        if (!idOrOptions) {
            throw new Error('A valid tag id needs to be specified.');
        }

        if ((!isString(idOrOptions) &&
            (!idOrOptions.groupId
                || !Array.isArray(idOrOptions.ids)
                || (Array.isArray(idOrOptions.ids) && !idOrOptions.ids.length)))) {
            throw new Error('A valid tag group id and array of tag ids needs to be specified.');
        }

        const tagId = isString(idOrOptions) ? idOrOptions : null;
        const groupId = !isString(idOrOptions) ? idOrOptions.groupId : null;

        const urlTemplate = isString(idOrOptions)
            ? '/api/management/projects/:projectId/tags/:id'
            : '/api/management/projects/:projectId/taggroups/:groupId/tags/bulk';

        const url = UrlBuilder.create(urlTemplate, { replacementTagId: null })
            .addOptions(tagId, 'id')
            .addOptions(groupId, 'groupId')
            .addOptions(replacementTagId, 'replacementTagId')
            .setParams(this.contensisClient.getParams())
            .toUrl();

        await this.contensisClient.ensureBearerToken();

        if (isString(idOrOptions))
            return await this.httpClient.request<void>(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'DELETE'
            });

        const bulkDeleteTagIds = idOrOptions.ids;
        return await this.httpClient.request<IBulkDeletedTags>(url, {
            headers: this.contensisClient.getHeaders(),
            method: 'DELETE',
            body: JSON.stringify(bulkDeleteTagIds)
        });
    }

}
