import { ResponseHandler, VersionStatus, ClientGrantType, ClientGrants } from 'contensis-core-api';
export interface Config {
    rootUrl?: string;
    projectId?: string;
    clientType?: ClientGrantType;
    clientDetails?: ClientGrants;
    defaultHeaders?: {
        [key: string]: string;
    };
    language?: string;
    versionStatus?: VersionStatus;
    pageIndex?: number;
    pageSize?: number;
    responseHandler?: ResponseHandler;
    fetchFn?: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}
