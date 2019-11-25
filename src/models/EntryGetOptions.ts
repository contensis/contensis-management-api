import { VersionStatus } from 'contensis-core-api';

export interface EntryGetOptions {
	id: string;
	versionStatus?: VersionStatus;
	version?: string;
	language?: string;
}
