import { Group } from './Group';
import { PagedList } from 'contensis-core-api';
import { GroupListOptions } from './GroupListOptions';

export interface IGroupOperations {
    getById(groupId: string): Promise<Group>;
    getByName(groupName: string): Promise<Group>;
    list(options?: GroupListOptions): Promise<PagedList<Group>>;
}
