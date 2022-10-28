import { Config } from '../models';
import { ClientGrants, ClientGrantType, ClientParams, ResponseHandler, VersionStatus } from 'contensis-core-api';
export declare class ClientConfig implements Config {
    private currentConfig;
    private previousConfig;
    rootUrl: string;
    clientType: ClientGrantType;
    clientDetails: ClientGrants;
    defaultHeaders: {
        [key: string]: string;
    };
    projectId: string;
    language: string;
    versionStatus: VersionStatus;
    pageIndex: number;
    pageSize: number;
    responseHandler: ResponseHandler;
    fetchFn: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
    constructor(currentConfig: Config, previousConfig: Config);
    toParams(): ClientParams;
    private getValue;
}
