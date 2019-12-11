import { Permissions } from './Permissions';
import { Assignments } from './Assignments';
export interface Role {
    id: string;
    name: {
        [key: string]: string;
    };
    description?: {
        [key: string]: string;
    };
    enabled: boolean;
    permissions: Permissions;
    assignments: Assignments;
}
