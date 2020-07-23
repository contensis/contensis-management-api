import { IEntryOperations } from './IEntryOperations';
import { IContentTypeOperations } from './IContentTypeOperations';
import { IParamsProvider } from 'contensis-core-api';
import { INodeOperations } from './INodeOperations';
import { IRoleOperations } from './IRoleOperations';
import { IProjectOperations } from './IProjectOperations';
import { IPermissionOperations } from './IPermissionOperations';
import { IComponentOperations } from './IComponentOperations';
import { ISecurityOperations } from './ISecurityOperations';
export interface ContensisClient extends IParamsProvider {
    components: IComponentOperations;
    contentTypes: IContentTypeOperations;
    entries: IEntryOperations;
    nodes: INodeOperations;
    permissions: IPermissionOperations;
    projects: IProjectOperations;
    roles: IRoleOperations;
    security: ISecurityOperations;
    getHeaders: (contentType?: string) => {
        [key: string]: string;
    };
    ensureBearerToken: () => Promise<string>;
}
