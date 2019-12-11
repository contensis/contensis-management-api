import {
    AllowedPermissions, Authorization, AuthorizationGetOptions, ContensisClient, IPermissionOperations, PermissionGetOptions
} from '../models';
import { IHttpClient, MapperFn, defaultMapperForLanguage, UrlBuilder } from 'contensis-core-api';

let getPermissionsMappers: { [key: string]: MapperFn } = {
    userId: (value: string) => (!!value) ? value : null,
    language: defaultMapperForLanguage
};

export class PermissionOperations implements IPermissionOperations {
    constructor(private httpClient: IHttpClient, private contensisClient: ContensisClient) {
    }

    getPermissions(options: PermissionGetOptions): Promise<AllowedPermissions> {
        if (!options) {
            throw new Error('Valid options need to be specified.');
        }

        if (!options.resourceType) {
            throw new Error('A valid resource type needs to be specified.');
        }

        if (!options.resourceId) {
            throw new Error('A valid resource id needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/projects/:projectId/security/permissions/:resourceType/:resourceId',
            { userId: null, language: null })
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(getPermissionsMappers)
            .toUrl();

        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<AllowedPermissions>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }

    getAuthorizationForAction(options: AuthorizationGetOptions): Promise<Authorization> {
        if (!options) {
            throw new Error('Valid options need to be specified.');
        }

        if (!options.resourceType) {
            throw new Error('A valid resource type needs to be specified.');
        }

        if (!options.resourceId) {
            throw new Error('A valid resource id needs to be specified.');
        }

        if (!options.actionName) {
            throw new Error('A valid action name needs to be specified.');
        }

        let url = UrlBuilder.create('/api/management/projects/:projectId/security/permissions/:resourceType/:resourceId/actions/:actionName',
            { userId: null, language: null })
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(getPermissionsMappers)
            .toUrl();

        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request<Authorization>(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
}
