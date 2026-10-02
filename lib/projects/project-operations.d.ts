import { ContensisClient, IProjectOperations } from '../models';
import { IHttpClient, Project } from 'contensis-core-api';
export declare class ProjectOperations implements IProjectOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    get(id?: string): Promise<Project>;
    list(): Promise<Project[]>;
    create(project: Project): Promise<Project>;
    update(project: Project): Promise<Project>;
    delete(id: string): Promise<void>;
}
