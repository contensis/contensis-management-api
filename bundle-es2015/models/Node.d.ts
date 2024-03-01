import { VersionInfo } from 'contensis-core-api';
declare type Optional<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Pick<Partial<T>, K>;
declare type Proxy = any | null;
declare type Renderer = any | null;
/**
 * A Node as it is returned from the Management API
 */
export interface Node {
    id: string;
    parentId?: string;
    projectId: string;
    displayName: {
        [key: string]: string;
    };
    slug: {
        [key: string]: string;
    };
    path: {
        [key: string]: string;
    };
    entryId?: string;
    isCanonical: boolean;
    restrictedToLanguages: string[];
    childCount: number;
    renderer: Renderer;
    proxy: Proxy;
    includeInMenu: boolean;
    version: Partial<VersionInfo>;
}
/**
 * A Node-like interface containing required properties to create a new Node
 * and all other properties are optional
 */
export interface ICreateNode extends Optional<Node, 'childCount' | 'id' | 'includeInMenu' | 'isCanonical' | 'path' | 'proxy' | 'renderer' | 'restrictedToLanguages' | 'version'> {
}
/**
* A Node-like interface containing required properties to update an
* existing Node and all other properties are optional
*/
export interface IUpdateNode extends Optional<Node, 'childCount' | 'path' | 'proxy' | 'renderer'> {
}
export {};
