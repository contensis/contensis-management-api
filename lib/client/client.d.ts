import { Config, ContensisClient, IContentTypeOperations, IEntryOperations, INodeOperations } from '../models';
import { ClientConfig } from './client-config';
import { ClientParams } from 'contensis-core-api';
export declare class Client implements ContensisClient {
    static defaultClientConfig: ClientConfig;
    clientConfig: ClientConfig;
    entries: IEntryOperations;
    contentTypes: IContentTypeOperations;
    nodes: INodeOperations;
    private httpClient;
    private token;
    static create(config?: Config): Client;
    static configure(config: Config): void;
    constructor(config?: Config);
    getParams(): ClientParams;
    getHeaders(): {
        [key: string]: string;
    };
    ensureAuthenticationToken(): Promise<string>;
    private authenticate;
}
