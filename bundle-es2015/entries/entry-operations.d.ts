import { Entry, EntryGetOptions, EntryListOptions, EntryUsageInfo, EntryUsageOptions, IEntryOperations, ContensisClient, WorkflowTrigger } from '../models';
import { IHttpClient, PagedList, ManagementQuery, ManagementZenqlQuery } from 'contensis-core-api';
export declare class EntryOperations implements IEntryOperations {
    protected httpClient: IHttpClient;
    protected contensisClient: ContensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    get(idOrOptions: string | EntryGetOptions): Promise<Entry>;
    list(contentTypeIdOrOptions?: string | EntryListOptions): Promise<PagedList<Entry>>;
    search(query: string | ManagementQuery | ManagementZenqlQuery): Promise<PagedList<Entry>>;
    create(entry: Entry): Promise<Entry>;
    update(entry: Entry): Promise<Entry>;
    getUsage(idOrOptions: string | EntryUsageOptions): Promise<PagedList<EntryUsageInfo>>;
    createAsset(asset: Entry, assetFilePath: string, parentNodePath: string): Promise<Entry>;
    updateAsset(asset: Entry, assetFilePath: string): Promise<Entry>;
    delete(id: string, languages?: string[], permanent?: boolean): Promise<void>;
    invokeWorkflow(entry: Entry, event: string, data?: any): Promise<Entry>;
    invokeWorkflowByTrigger(entry: Entry, workflowTrigger: WorkflowTrigger): Promise<Entry>;
    private searchUsingManagementQuery;
    private searchUsingPost;
}
