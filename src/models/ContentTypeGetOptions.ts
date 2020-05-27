import { VersionStatus } from 'contensis-core-api';

export interface ContentTypeGetOptions {
	id: string;
	versionStatus?: VersionStatus;
	version?: string;
}
