import { PageOptions } from 'contensis-core-api';

export interface UserGroupsOptions {
	userId: string;
	includeInherited?: boolean;
	excludedGroups?: string[];
	pageOptions?: PageOptions;
	order?: string[];
}
