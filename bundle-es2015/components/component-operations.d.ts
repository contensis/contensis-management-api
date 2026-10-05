import { ContensisClient, Component, ComponentGetOptions, IComponentOperations } from '../models';
import { Component as ComponentBase, IHttpClient, VersionStatus } from 'contensis-core-api';
export declare class ComponentOperations implements IComponentOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    get(idOrOptions: string | ComponentGetOptions): Promise<Component>;
    list(versionStatus?: VersionStatus): Promise<Component[]>;
    create(component: ComponentBase): Promise<Component>;
    update(component: ComponentBase): Promise<Component>;
    delete(id: string): Promise<void>;
    invokeWorkflow(component: ComponentBase, event: string, data?: any): Promise<Component>;
}
