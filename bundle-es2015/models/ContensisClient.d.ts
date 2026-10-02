import { IParamsProvider } from 'contensis-core-api';
import { IComponentOperations } from './IComponentOperations';
import { IContentTypeOperations } from './IContentTypeOperations';
import { IEntryOperations } from './IEntryOperations';
import { INodeOperations } from './INodeOperations';
import { IPermissionOperations } from './IPermissionOperations';
import { IProjectOperations } from './IProjectOperations';
import { IRoleOperations } from './IRoleOperations';
import { ISecurityOperations } from './ISecurityOperations';
import { ITagOperations } from './ITagOperations';
export interface ContensisClient extends IParamsProvider {
    components: IComponentOperations;
    contentTypes: IContentTypeOperations;
    entries: IEntryOperations;
    nodes: INodeOperations;
    permissions: IPermissionOperations;
    projects: IProjectOperations;
    roles: IRoleOperations;
    security: ISecurityOperations;
    tags: ITagOperations;
    getHeaders: (contentType?: string) => {
        [key: string]: string;
    };
    ensureBearerToken: () => Promise<string>;
}
