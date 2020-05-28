import { ContensisClient, Group, GroupListOptions, IGroupOperations } from '../models';
import { IHttpClient, PagedList } from 'contensis-core-api';
export declare class GroupOperations implements IGroupOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    getById(groupId: string): Promise<Group>;
    getByName(groupName: string): Promise<Group>;
    list(options?: GroupListOptions): Promise<PagedList<Group>>;
    private getGroup;
}
