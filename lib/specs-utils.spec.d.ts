import { Config, User, Group } from './models';
export declare const defaultUsers: Partial<User>[];
export declare const defaultGroups: Partial<Group>[];
export declare function getDefaultAuthenticateUrl(isRelative?: boolean): string;
export declare function getDefaultConfig(): Config;
export declare function getDefaultResponse(method?: string, isRelative?: boolean): Object;
export declare function setDefaultSpy(global: any, returnValueForApi: any): void;
