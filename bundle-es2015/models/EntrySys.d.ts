import { VersionInfo } from 'contensis-core-api';
import { Workflow } from './Workflow';
export interface EntrySys {
    id: string;
    projectId: string;
    contentTypeId: string;
    dataFormat: string;
    language: string;
    availableLanguages: string[];
    unavailableLanguages: string[];
    uri: string;
    metadata: {
        [key: string]: any;
    };
    workflow: Workflow;
    isPublished: boolean;
    translationState: string;
    version: VersionInfo;
}
