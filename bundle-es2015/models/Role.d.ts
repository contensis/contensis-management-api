import { Permissions } from './Permissions';
import { Assignments } from './Assignments';
export interface Role {
    id: string;
    name: string;
    description?: string;
    enabled: boolean;
    permissions: Permissions;
    assignments: Assignments;
}
