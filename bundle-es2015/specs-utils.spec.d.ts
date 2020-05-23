import { Config } from './models';
export declare function getDefaultAuthenticateUrl(isRelative?: boolean): string;
export declare function getDefaultConfig(): Config;
export declare function getDefaultResponse(method?: string, isRelative?: boolean): Object;
export declare function setDefaultSpy(global: any, returnValueForApi: any): void;
