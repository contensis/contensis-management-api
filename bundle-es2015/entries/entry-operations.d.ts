import { EntryGetOptions, EntryListOptions, IEntryOperations, ContensisClient } from '../models';
import { Entry, IHttpClient, PagedList } from 'contensis-core-api';
export declare class EntryOperations implements IEntryOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    get(idOrOptions: string | EntryGetOptions): Promise<Entry>;
    list(contentTypeIdOrOptions: string | EntryListOptions): Promise<PagedList<Entry>>;
    create(entry: Entry): Promise<Entry>;
    update(entry: Entry): Promise<Entry>;
    createAsset(asset: Entry, assetFilePath: string, parentNodePath: string): Promise<Entry>;
    updateAsset(asset: Entry, assetFilePath: string): Promise<Entry>;
    delete(id: string): Promise<void>;
    invokeWorkflow(entry: Entry, event: string, data?: any): Promise<Entry>;
}
