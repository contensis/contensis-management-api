import { IEntryOperations } from './IEntryOperations';
import { IContentTypeOperations } from './IContentTypeOperations';

import { IParamsProvider } from 'contensis-core-api';
import { INodeOperations } from './INodeOperations';
import { IRoleOperations } from './IRoleOperations';
import { IProjectOperations } from './IProjectOperations';
import { IPermissionOperations } from './IPermissionOperations';
import { IComponentOperations } from './IComponentOperations';
import { IGroupOperations } from './IGroupOperations';
import { IUserOperations } from './IUserOperations';

export interface ContensisClient extends IParamsProvider {

	components: IComponentOperations;
	contentTypes: IContentTypeOperations;
	entries: IEntryOperations;
	groups: IGroupOperations;
	nodes: INodeOperations;
	permissions: IPermissionOperations;
	projects: IProjectOperations;
	roles: IRoleOperations;
	users: IUserOperations;

	getHeaders: (contentType?: string) => { [key: string]: string };
	ensureBearerToken: () => Promise<string>;
}
