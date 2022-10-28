import { PageOptions, VersionStatus } from 'contensis-core-api';
export interface EntryUsageOptions {
    id: string;
    language?: string;
    versionStatus?: VersionStatus;
    pageOptions?: PageOptions;
    contentTypeId?: string;
    query?: string;
}
