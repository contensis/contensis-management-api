import { Config, ContensisClient, IContentTypeOperations, IEntryOperations, INodeOperations, IProjectOperations, IRoleOperations, IPermissionOperations, IComponentOperations, IGroupOperations, IUserOperations } from '../models';
import { ClientConfig } from './client-config';
import { ClientParams } from 'contensis-core-api';
export declare class Client implements ContensisClient {
    static defaultClientConfig: ClientConfig;
    clientConfig: ClientConfig;
    fetchFn: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
    components: IComponentOperations;
    contentTypes: IContentTypeOperations;
    entries: IEntryOperations;
    groups: IGroupOperations;
    nodes: INodeOperations;
    permissions: IPermissionOperations;
    projects: IProjectOperations;
    roles: IRoleOperations;
    users: IUserOperations;
    bearerToken: string;
    bearerTokenExpiryDate: Date;
    refreshToken?: string;
    refreshTokenExpiryDate?: Date;
    private contensisClassicToken;
    private httpClient;
    static create(config?: Config): Client;
    static configure(config: Config): void;
    constructor(config?: Config);
    getParams(): ClientParams;
    getHeaders(contentType?: string): {
        [key: string]: string;
    };
    isBearerTokenExpired(): boolean;
    isRefreshTokenExpired(): boolean;
    ensureBearerToken(): Promise<string>;
    private authenticate;
    private getAuthenticatePayload;
}
