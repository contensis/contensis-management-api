import { AllowedPermissions } from './AllowedPermissions';
import { AuthorizationGetOptions } from './AuthorizationGetOptions';
import { PermissionGetOptions } from './PermissionGetOptions';
import { Authorization } from './Authorization';

export interface IPermissionOperations {
	getPermissions(options: PermissionGetOptions): Promise<AllowedPermissions>;
	getAuthorizationForAction(options: AuthorizationGetOptions): Promise<Authorization>;
}
