import { Config } from '../models';
import { ClientParams, ResponseHandler, VersionStatus } from 'contensis-core-api';
export declare class ClientConfig implements Config {
    private currentConfig;
    private previousConfig;
    rootUrl: string;
    clientId: string;
    clientSecret: string;
    projectId: string;
    language: string;
    versionStatus: VersionStatus;
    pageIndex: number;
    pageSize: number;
    responseHandler: ResponseHandler;
    constructor(currentConfig: Config, previousConfig: Config);
    toParams(): ClientParams;
    private getValue;
}
