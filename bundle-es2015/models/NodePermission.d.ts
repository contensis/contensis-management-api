import { Permission } from './Permission';
export interface NodePermission extends Permission {
    contentTypeIds: string[];
    scope: string;
}
