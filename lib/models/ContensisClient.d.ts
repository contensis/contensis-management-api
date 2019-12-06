import { IEntryOperations } from './IEntryOperations';
import { IContentTypeOperations } from './IContentTypeOperations';
import { IParamsProvider } from 'contensis-core-api';
import { INodeOperations } from './INodeOperations';
export interface ContensisClient extends IParamsProvider {
    entries: IEntryOperations;
    contentTypes: IContentTypeOperations;
    nodes: INodeOperations;
    getHeaders: (contentType?: string) => {
        [key: string]: string;
    };
    ensureAuthenticationToken: () => Promise<string>;
}
