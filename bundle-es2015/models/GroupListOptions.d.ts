import { UserListOptions } from './UserListOptions';
export interface GroupListOptions extends UserListOptions {
}
export declare type GroupChildListOptions = Pick<GroupListOptions, Exclude<keyof GroupListOptions, 'q'>>;
export declare type GroupUserListOptions = Pick<UserListOptions, Exclude<keyof UserListOptions, 'q'>>;
