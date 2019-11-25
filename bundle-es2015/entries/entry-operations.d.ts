import { EntryGetOptions, EntryListOptions, IEntryOperations, ContensisClient } from '../models';
import { Entry, IHttpClient, PagedList } from 'contensis-core-api';
export declare class EntryOperations implements IEntryOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    get(idOrOptions: string | EntryGetOptions): Promise<Entry>;
    list(contentTypeIdOrOptions: string | EntryListOptions): Promise<PagedList<Entry>>;
}
