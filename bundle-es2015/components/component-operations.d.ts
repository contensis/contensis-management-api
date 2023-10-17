import { ContensisClient, ComponentGetOptions, IComponentOperations } from '../models';
import { Component, IHttpClient, VersionStatus } from 'contensis-core-api';
export declare class ComponentOperations implements IComponentOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    get(idOrOptions: string | ComponentGetOptions): Promise<Component>;
    list(versionStatus?: VersionStatus): Promise<Component[]>;
    create(component: Component): Promise<Component>;
    update(component: Component): Promise<Component>;
    delete(id: string): Promise<void>;
    invokeWorkflow(component: Component, event: string, data?: any): Promise<Component>;
}
