import { PageOptions } from 'contensis-core-api';


export interface GroupChildListOptions {
    includeInherited?: boolean;
    excludedGroups?: string[];
    pageOptions?: PageOptions;
    order?: string[];
    zenQL?: string;
}
