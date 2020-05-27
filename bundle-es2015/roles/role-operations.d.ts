import { ContensisClient, IRoleOperations, Role } from '../models';
import { IHttpClient, PageOptions, PagedList } from 'contensis-core-api';
export declare class RoleOperations implements IRoleOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    get(id: string): Promise<Role>;
    list(options?: PageOptions): Promise<PagedList<Role>>;
    create(role: Role): Promise<Role>;
    update(role: Role): Promise<Role>;
    delete(id: string): Promise<void>;
}
