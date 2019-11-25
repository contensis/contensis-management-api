import { Entry, PagedList } from 'contensis-core-api';
import { EntryGetOptions } from './EntryGetOptions';
import { EntryListOptions } from './EntryListOptions';
export interface IEntryOperations {
    get(idOrOptions: string | EntryGetOptions): Promise<Entry>;
    list(contentTypeIdOrOptions: string | EntryListOptions): Promise<PagedList<Entry>>;
}
