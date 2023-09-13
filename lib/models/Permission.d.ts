import { BasePermission } from './BasePermission';
export interface Permission extends BasePermission {
    languages: string[];
}
