import { Config, ContensisClient, IContentTypeOperations, IEntryOperations, INodeOperations, IProjectOperations, IRoleOperations, IPermissionOperations, IComponentOperations, ISecurityOperations, IEventOperations } from '../models';
import { ClientConfig } from './client-config';
import { ClientParams, IHttpClient } from 'contensis-core-api';
/**
 * The core client class is designed to be used in modern browsers with minimal dpendencies, optimised for bundling.
 *
 * It can also be used on Node.js with a fetch module like 'node-fetch'.
 *
 * If no fetchFn value is provided it will assume it runs in a modern browser and fetch is already available.
 */
export declare class Client implements ContensisClient {
    protected fetchFn: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
    static defaultClientConfig: ClientConfig;
    clientConfig: ClientConfig;
    components: IComponentOperations;
    contentTypes: IContentTypeOperations;
    entries: IEntryOperations;
    events: IEventOperations;
    nodes: INodeOperations;
    permissions: IPermissionOperations;
    projects: IProjectOperations;
    roles: IRoleOperations;
    security: ISecurityOperations;
    bearerToken: string;
    bearerTokenExpiryDate: Date;
    refreshToken?: string;
    refreshTokenExpiryDate?: Date;
    protected httpClient: IHttpClient;
    private contensisClassicToken;
    static create(config?: Config, fetchFn?: (input: RequestInfo, init?: RequestInit) => Promise<Response>): Client;
    static configure(config: Config): void;
    constructor(config?: Config, fetchFn?: (input: RequestInfo, init?: RequestInit) => Promise<Response>);
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
