import { ContensisClient, IRedirectOperations, Redirect } from '../models';
import { IHttpClient, PageOptions, PagedList } from 'contensis-core-api';
export declare class RedirectOperations implements IRedirectOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    get(id: string): Promise<Redirect>;
    list(options?: PageOptions): Promise<PagedList<Redirect>>;
    create(redirect: Redirect): Promise<Redirect>;
    update(redirect: Redirect): Promise<Redirect>;
    delete(id: string): Promise<void>;
    private ensureRedirectIsValid;
}
