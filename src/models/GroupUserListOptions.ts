import { PageOptions } from 'contensis-core-api';

export interface GroupUserListOptions {
    includeInherited?: boolean;
    excludedGroups?: string[];
    pageOptions?: PageOptions;
    order?: string[];
    zenQL?: string;
}
