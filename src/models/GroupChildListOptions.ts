import { PageOptions } from 'contensis-core-api';


export interface GroupChildListOptions {
    includeInherited?: boolean;
    pageOptions?: PageOptions;
    order?: string[];
    zenQL?: string;
}
