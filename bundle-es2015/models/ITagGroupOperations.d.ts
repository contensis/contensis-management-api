import { PagedList } from "contensis-core-api";
import { ICreateTagGroup } from "./ICreateTagGroup";
import { IUpdateTagGroup } from "./IUpdateTagGroup";
import { TagGroup } from "./TagGroup";
import { TagGroupListOptions } from "./TagGroupListOptions";
import { TagGroupUsageInfo } from "./TagGroupUsageInfo";
import { TagGroupUsageOptions } from "./TagGroupUsageOptions";
export interface ITagGroupOperations {
    get(id: string): Promise<TagGroup>;
    list(): Promise<PagedList<TagGroup>>;
    list(options: TagGroupListOptions): Promise<PagedList<TagGroup>>;
    create(tagGroup: ICreateTagGroup): Promise<TagGroup>;
    update(tagGroup: IUpdateTagGroup): Promise<TagGroup>;
    delete(id: string): Promise<void>;
    getUsage(id: string): Promise<PagedList<TagGroupUsageInfo>>;
    getUsage(options: TagGroupUsageOptions): Promise<PagedList<TagGroupUsageInfo>>;
}
