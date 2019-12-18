import { ResponseHandler, VersionStatus } from 'contensis-core-api';

export interface Config {
	rootUrl?: string;
	projectId?: string;
	clientId?: string;
	clientSecret?: string;
	defaultHeaders?: { [key: string]: string };
	language?: string;
	versionStatus?: VersionStatus;
	pageIndex?: number;
	pageSize?: number;
	responseHandler?: ResponseHandler;
}
