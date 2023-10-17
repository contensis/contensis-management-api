import { PermissionGetOptions } from './PermissionGetOptions';
export interface AuthorizationGetOptions extends PermissionGetOptions {
    actionName: string;
}
