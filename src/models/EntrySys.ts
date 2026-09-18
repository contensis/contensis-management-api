import { VersionInfo } from 'contensis-core-api';
import { Workflow } from './Workflow';

export interface EntrySys {
	availableLanguages: string[];
	contentTypeId: string;
	dataFormat: string;
	id: string;
	isPublished: boolean;
	language: string;
	owner: string;
	metadata: {
		[key: string]: string;
	};
	projectId: string;
	/** `{}` for entries; structured file metadata for assets
	 * (filename, fileExtension, filePath, fileId, fileSize, fileHash,
	 * and width/height/orientation/ratio on images).
	 * Kept generic because the same `Entry` type covers entries and assets;
	 * the asset-specific shape lives on `AssetSys` in contensis-delivery-api. */
	properties?: {
		[key: string]: any;
	};
	review?: {
		due?: string;
		windowStart?: string;
		created?: string;
		type?: string;
		assigned?: string;
		assignedBy?: string;
		assignedTo?: string;
	};
	schedules?: {
		publish?: {
			dateTime: string;
		};
	};
	/** `null` for assets, string for entries. */
	slug: string;
	translationState: string;
	unavailableLanguages: string[];
	/** Present on single-entry GET responses; absent on search/list results.
	 * Dictated by the nodes API (site-view placement), not set by entry
	 * create/update callers — optional, not deprecated. */
	uri?: string;
	version: VersionInfo;
	versionStatus: string;
	workflow: Workflow;
}
