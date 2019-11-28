import { Entry, PagedList } from 'contensis-core-api';
import { EntryGetOptions } from './EntryGetOptions';
import { EntryListOptions } from './EntryListOptions';
export interface IEntryOperations {
    get(idOrOptions: string | EntryGetOptions): Promise<Entry>;
    list(contentTypeIdOrOptions: string | EntryListOptions): Promise<PagedList<Entry>>;
    create(entry: Entry): Promise<Entry>;
    update(entry: Entry): Promise<Entry>;
    delete(id: string): Promise<void>;
    invokeWorkflow(entry: Entry, event: string, data?: any): Promise<Entry>;
}
