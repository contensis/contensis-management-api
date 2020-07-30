import { IUserOperations } from './IUserOperations';
import { IGroupOperations } from './IGroupOperations';

export interface ISecurityOperations {
    readonly users: IUserOperations;
    readonly groups: IGroupOperations;
}
