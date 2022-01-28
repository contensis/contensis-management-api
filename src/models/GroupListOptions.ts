import { UserListOptions } from './UserListOptions';
export interface GroupListOptions extends UserListOptions {
}

export type GroupChildListOptions = Pick<GroupListOptions, Exclude<keyof GroupListOptions, 'q'>>;
export type GroupUserListOptions = Pick<UserListOptions, Exclude<keyof UserListOptions, 'q'>>;
