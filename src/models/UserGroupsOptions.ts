import { PageOptions } from 'contensis-core-api';

export interface UserGroupsOptions {
	userId: string;
	includeInherited?: boolean;
	pageOptions?: PageOptions;
	order?: string[];
}
