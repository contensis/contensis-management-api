import { BasePermission } from './BasePermission';
import { NodePermission } from './NodePermission';
import { Permission } from './Permission';
export interface Permissions {
    assets?: Permission[];
    blocks?: BasePermission;
    certificates?: BasePermission;
    comments?: BasePermission;
    contentTypes?: BasePermission[];
    domains?: BasePermission;
    entries?: Permission[];
    eventStreams?: BasePermission;
    nodes?: NodePermission[];
    proxies?: BasePermission;
    redirects?: BasePermission;
    renderers?: BasePermission;
    views?: BasePermission;
    webhookSubscriptions?: BasePermission;
}
