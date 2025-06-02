import { PagedList } from "contensis-core-api";
import { ICreateTag } from "./ICreateTag";
import { IUpdateTag } from "./IUpdateTag";
import { PagedUsageList } from "./PagedUsageList";
import { Tag } from "./Tag";
import { TagGetByLabelOptions } from "./TagGetByLabelOptions";
import { TagListOptions } from "./TagListOptions";
import { TagUsageInfo } from "./TagUsageInfo";
import { TagUsageOptions } from "./TagUsageOptions";
import { IBulkDeletedTags } from "./IBulkDeletedTags";
import { TagBulkDeleteOptions } from "./TagBulkDeleteOptions";
import { ITagGroupOperations } from "./ITagGroupOperations";

export interface ITagOperations {
    groups: ITagGroupOperations;
    get(id: string): Promise<Tag>;
    get(options: TagGetByLabelOptions): Promise<Tag>;
    list(): Promise<PagedList<Tag>>;
    list(groupId: string): Promise<PagedList<Tag>>;
    list(options: TagListOptions): Promise<PagedList<Tag>>;
    create(tag: ICreateTag): Promise<Tag>;
    update(tag: IUpdateTag): Promise<Tag>;
    delete(id: string, replacementTagId?: string): Promise<void>;
    delete(options: TagBulkDeleteOptions, replacementTagId?: string): Promise<IBulkDeletedTags>;
    getUsage(id: string): Promise<PagedUsageList<TagUsageInfo>>;
    getUsage(options: TagUsageOptions): Promise<PagedUsageList<TagUsageInfo>>;
}
