import { PagedList } from 'contensis-core-api';
import { Entry } from './Entry';
import { EntryGetOptions } from './EntryGetOptions';
import { EntryListOptions } from './EntryListOptions';
import { WorkflowTrigger } from './WorkflowTrigger';

export interface IEntryOperations {
	get(idOrOptions: string | EntryGetOptions): Promise<Entry>;
	list(contentTypeIdOrOptions?: string | EntryListOptions): Promise<PagedList<Entry>>;
	// TODO: should query arg use ManagementQuery type from contensis-core-api?
	search(query: any): Promise<PagedList<Entry>>;
	create(entry: Entry): Promise<Entry>;
	update(entry: Entry): Promise<Entry>;
	createAsset(asset: Entry, assetFilePath: string, parentNodePath: string): Promise<Entry>;
	updateAsset(asset: Entry, assetFilePath?: string): Promise<Entry>;
	delete(id: string, languages?: string[], permanent?: boolean): Promise<void>;
	invokeWorkflow(entry: Entry, event: string, data?: any): Promise<Entry>;
	invokeWorkflowByTrigger(entry: Entry, workflowTrigger: WorkflowTrigger): Promise<Entry>;
}
