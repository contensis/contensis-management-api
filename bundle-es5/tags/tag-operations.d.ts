import { IHttpClient, PagedList } from 'contensis-core-api';
import { ContensisClient, IBulkDeletedTags, ICreateTag, ITagGroupOperations, ITagOperations, IUpdateTag, PagedUsageList, Tag, TagBulkDeleteOptions, TagGetByLabelOptions, TagListOptions, TagUsageInfo, TagUsageOptions } from '../models';
export declare class TagOperations implements ITagOperations {
    protected httpClient: IHttpClient;
    protected contensisClient: ContensisClient;
    groups: ITagGroupOperations;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    get(idOrOptions: string | TagGetByLabelOptions): Promise<Tag>;
    list(groupIdOrOptions?: string | TagListOptions): Promise<PagedList<Tag>>;
    create(tag: ICreateTag): Promise<Tag>;
    update(tag: IUpdateTag): Promise<Tag>;
    getUsage(idOrOptions: string | TagUsageOptions): Promise<PagedUsageList<TagUsageInfo>>;
    delete(id: string, replacementTagId?: string): Promise<void>;
    delete(options: TagBulkDeleteOptions, replacementTagId?: string): Promise<IBulkDeletedTags>;
}
