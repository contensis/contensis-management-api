import { ResourceType } from './ResourceType';
export interface PermissionGetOptions {
    resourceType: ResourceType;
    resourceId?: string;
    userId: string;
    language?: string;
}
