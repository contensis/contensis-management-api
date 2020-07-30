import { IGroupOperations, ISecurityOperations, IUserOperations } from '../models';

export class SecurityOperations implements ISecurityOperations {
    constructor(readonly users: IUserOperations, readonly groups: IGroupOperations) {
    }
}
