import { ManagementQuery, ManagementZenqlQuery, PagedSearchList, PagedList } from 'contensis-core-api';
import { Entry } from './Entry';
import { EntryGetOptions } from './EntryGetOptions';
import { EntryListOptions } from './EntryListOptions';
import { EntryUsageInfo } from './EntryUsageInfo';
import { EntryUsageOptions } from './EntryUsageOptions';
import { PagedUsageList } from './PagedUsageList';
import { WorkflowTrigger } from './WorkflowTrigger';
export interface IEntryOperations {
    get(idOrOptions: string | EntryGetOptions): Promise<Entry>;
    list(contentTypeIdOrOptions?: string | EntryListOptions): Promise<PagedList<Entry>>;
    search(query: string): Promise<PagedList<Entry>>;
    search(query: ManagementQuery | ManagementZenqlQuery): Promise<PagedSearchList<Entry>>;
    create(entry: Entry): Promise<Entry>;
    update(entry: Entry): Promise<Entry>;
    getUsage(idOrOptions: string | EntryUsageOptions): Promise<PagedUsageList<EntryUsageInfo>>;
    createAsset(asset: Entry, assetFilePath: string, parentNodePath: string): Promise<Entry>;
    updateAsset(asset: Entry, assetFilePath?: string): Promise<Entry>;
    delete(id: string, languages?: string[], permanent?: boolean): Promise<void>;
    invokeWorkflow(entry: Entry, event: string, data?: any): Promise<Entry>;
    invokeWorkflowByTrigger(entry: Entry, workflowTrigger: WorkflowTrigger): Promise<Entry>;
}
