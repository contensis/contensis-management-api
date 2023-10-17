import { AllowedPermissions, Authorization, AuthorizationGetOptions, ContensisClient, IPermissionOperations, PermissionGetOptions } from '../models';
import { IHttpClient } from 'contensis-core-api';
export declare class PermissionOperations implements IPermissionOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    getPermissions(options: PermissionGetOptions): Promise<AllowedPermissions>;
    getAuthorizationForAction(options: AuthorizationGetOptions): Promise<Authorization>;
}
