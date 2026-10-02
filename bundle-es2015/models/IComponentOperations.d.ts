import { Component, VersionStatus } from 'contensis-core-api';
import { ComponentGetOptions } from './ComponentGetOptions';
export interface IComponentOperations {
    get(idOrOptions: string | ComponentGetOptions): Promise<Component>;
    list(versionStatus?: VersionStatus): Promise<Component[]>;
    create(contentType: Component): Promise<Component>;
    update(contentType: Component): Promise<Component>;
    delete(id: string): Promise<void>;
    invokeWorkflow(contentType: Component, event: string, data?: any): Promise<Component>;
}
