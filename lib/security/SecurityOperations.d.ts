import { IGroupOperations, ISecurityOperations, IUserOperations } from '../models';
export declare class SecurityOperations implements ISecurityOperations {
    readonly users: IUserOperations;
    readonly groups: IGroupOperations;
    constructor(users: IUserOperations, groups: IGroupOperations);
}
