import { Redirect } from './Redirect';
import { PageOptions, PagedList } from 'contensis-core-api';
export interface IRedirectOperations {
    get(id: string): Promise<Redirect>;
    list(options?: PageOptions): Promise<PagedList<Redirect>>;
    create(redirect: Redirect): Promise<Redirect>;
    update(redirect: Redirect): Promise<Redirect>;
    delete(id: string): Promise<void>;
}
