import { ContensisClient, Group, GroupListOptions, IGroupOperations } from '../models';
import { IHttpClient, PagedList, UrlBuilder, MapperFn, ClientParams } from 'contensis-core-api';

let listMappers: { [key: string]: MapperFn } = {
    pageIndex: (value: number, options: GroupListOptions, params: ClientParams) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
    pageSize: (value: number, options: GroupListOptions, params: ClientParams) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
    order: (value: string[]) => (value && value.length > 0) ? value : null,
};

export class GroupOperations implements IGroupOperations {

    constructor(private httpClient: IHttpClient, private contensisClient: ContensisClient) {
        if (!this.httpClient || !this.contensisClient) {
            throw new Error('The class UserOperations was not initialised correctly.');
        }
    }

    getById(groupId: string): Promise<Group> {
        return this.getGroup(groupId);
    }

    getByName(groupName: string): Promise<Group> {
        return this.getGroup(groupName);
    }

    list(options?: GroupListOptions): Promise<PagedList<Group>> {
        let url = UrlBuilder.create('/api/management/security/groups',
            !options ? {} : { q: null, pageIndex: null, pageSize: null, order: null })
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();

        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<PagedList<Group>>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    private getGroup(idOrName: string) {
        let url = UrlBuilder.create('/api/management/security/groups/:idOrName', {})
            .addOptions(idOrName, 'idOrName')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<Group>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
}
