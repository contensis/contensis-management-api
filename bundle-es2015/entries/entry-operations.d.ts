import { Entry, EntryGetOptions, EntryListOptions, IEntryOperations, ContensisClient, WorkflowTrigger } from '../models';
import { IHttpClient, PagedList } from 'contensis-core-api';
export declare class EntryOperations implements IEntryOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    get(idOrOptions: string | EntryGetOptions): Promise<Entry>;
    list(contentTypeIdOrOptions?: string | EntryListOptions): Promise<PagedList<Entry>>;
    search(query: any): Promise<PagedList<Entry>>;
    create(entry: Entry): Promise<Entry>;
    update(entry: Entry): Promise<Entry>;
    createAsset(asset: Entry, assetFilePath: string, parentNodePath: string): Promise<Entry>;
    updateAsset(asset: Entry, assetFilePath: string): Promise<Entry>;
    delete(id: string, languages?: string[]): Promise<void>;
    invokeWorkflow(entry: Entry, event: string, data?: any): Promise<Entry>;
    invokeWorkflowByTrigger(entry: Entry, workflowTrigger: WorkflowTrigger): Promise<Entry>;
}
