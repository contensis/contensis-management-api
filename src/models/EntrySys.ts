import { VersionInfo } from 'contensis-core-api';
import { Workflow } from './Workflow';

export interface EntrySys {
	availableLanguages: string[];
	contentTypeId: string;
	dataFormat: string;
	id: string;
	isPublished: boolean;
	language: string;
	metadata: {
		[key: string]: any;
	};
	projectId: string;
	translationState: string;
	unavailableLanguages: string[];
	uri: string;
	version: VersionInfo;
	workflow: Workflow;
}
