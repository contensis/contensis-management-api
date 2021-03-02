import { Config, User, Group } from './models';
export declare const defaultUsers: Partial<User>[];
export declare const defaultGroups: Partial<Group>[];
export declare function getDefaultAuthenticateUrl(isRelative?: boolean): string;
export declare function getDefaultConfig(): Config;
export declare function getDefaultFetchRequest(method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE', isRelativeUrl?: boolean, body?: string): Object;
export declare function getDefaultXMLHttpRequest(method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE', body?: string): Object;
export declare function setDefaultSpy(global: any, returnValueForApi: any, rejectRequest?: boolean): void;
