import { IHttpClient, PagedList } from 'contensis-core-api';
import { ContensisClient, ICreateTagGroup, ITagGroupOperations, IUpdateTagGroup, TagGroup, TagGroupListOptions, TagGroupUsageInfo, TagGroupUsageOptions } from '../models';
export declare class TagGroupOperations implements ITagGroupOperations {
    protected httpClient: IHttpClient;
    protected contensisClient: ContensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    get(id: string): Promise<TagGroup>;
    list(options?: TagGroupListOptions): Promise<PagedList<TagGroup>>;
    create(group: ICreateTagGroup): Promise<TagGroup>;
    update(group: IUpdateTagGroup): Promise<TagGroup>;
    getUsage(idOrOptions: string | TagGroupUsageOptions): Promise<PagedList<TagGroupUsageInfo>>;
    delete(id: string): Promise<void>;
}
