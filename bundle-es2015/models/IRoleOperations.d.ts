import { Role } from './Role';
import { PageOptions } from 'contensis-core-api';
export interface IRoleOperations {
    get(id: string): Promise<Role>;
    list(options?: PageOptions): Promise<Role[]>;
    create(role: Role): Promise<Role>;
    update(role: Role): Promise<Role>;
    delete(id: string): Promise<void>;
}
