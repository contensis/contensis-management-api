import { PageOptions, VersionStatus } from 'contensis-core-api';
export interface EntryListOptions {
    contentTypeId?: string;
    language?: string;
    versionStatus?: VersionStatus;
    pageOptions?: PageOptions;
    order?: string[];
}
