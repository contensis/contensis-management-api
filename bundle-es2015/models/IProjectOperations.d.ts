import { Project } from 'contensis-core-api';
export interface IProjectOperations {
    get(id?: string): Promise<Project>;
    list(): Promise<Project[]>;
    create(project: Project): Promise<Project>;
    update(project: Project): Promise<Project>;
    delete(id: string): Promise<void>;
}
