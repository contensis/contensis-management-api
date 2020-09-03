import { Entry, ContensisClient } from '../models';
import { EntryOperations } from './entry-operations';
import { IHttpClient } from 'contensis-core-api';
export declare class EntryOperationsForServer extends EntryOperations {
    protected httpClient: IHttpClient;
    protected contensisClient: ContensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    createAsset(asset: Entry, assetFilePath: string, parentNodePath: string): Promise<Entry>;
    updateAsset(asset: Entry, assetFilePath: string): Promise<Entry>;
    private ensureIsNode;
}
