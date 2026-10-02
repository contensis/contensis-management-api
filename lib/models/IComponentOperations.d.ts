import { Component as ComponentBase, VersionStatus } from 'contensis-core-api';
import { Component } from './Component';
import { ComponentGetOptions } from './ComponentGetOptions';
export interface IComponentOperations {
    get(idOrOptions: string | ComponentGetOptions): Promise<Component>;
    list(versionStatus?: VersionStatus): Promise<Component[]>;
    create(contentType: ComponentBase): Promise<Component>;
    update(contentType: ComponentBase): Promise<Component>;
    delete(id: string): Promise<void>;
    invokeWorkflow(contentType: ComponentBase, event: string, data?: any): Promise<Component>;
}
