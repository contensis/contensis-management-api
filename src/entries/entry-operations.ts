import {
	EntryGetOptions, EntryListOptions, IEntryOperations, ContensisClient, WorkflowTrigger
} from '../models';
import {
	AssetUpload, ClientParams, defaultMapperForLanguage, defaultMapperForLatestVersionStatus,
	Entry, IHttpClient, MapperFn, PagedList, SysAssetFile, UrlBuilder
} from 'contensis-core-api';
import * as FormData from 'form-data';
import * as fs from 'fs';

let getMappers: { [key: string]: MapperFn } = {
	language: defaultMapperForLanguage,
	versionStatus: defaultMapperForLatestVersionStatus,
	version: (value: string) => (!!value) ? value : null
};

let listMappers: { [key: string]: MapperFn } = {
	language: defaultMapperForLanguage,
	versionStatus: defaultMapperForLatestVersionStatus,
	pageIndex: (value: number, options: EntryListOptions, params: ClientParams) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
	pageSize: (value: number, options: EntryListOptions, params: ClientParams) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
	order: (value: string[]) => (value && value.length > 0) ? value : null,
};

export class EntryOperations implements IEntryOperations {
	constructor(private httpClient: IHttpClient, private contensisClient: ContensisClient) {
	}

	get(idOrOptions: string | EntryGetOptions): Promise<Entry> {
		let url = UrlBuilder.create('/api/management/projects/:projectId/entries/:id',
			{ language: null, versionStatus: null, version: null })
			.addOptions(idOrOptions, 'id')
			.setParams(this.contensisClient.getParams())
			.addMappers(getMappers)
			.toUrl();

		return this.contensisClient.ensureAuthenticationToken().then(() => {
			return this.httpClient.request<Entry>(url, {
				headers: this.contensisClient.getHeaders()
			});
		});
	}

	list(contentTypeIdOrOptions: string | EntryListOptions): Promise<PagedList<Entry>> {
		let url = UrlBuilder.create('/api/management/projects/:projectId/contentTypes/:contentTypeId/entries',
			{ language: null, versionStatus: null, pageIndex: null, pageSize: null, order: null })
			.addOptions(contentTypeIdOrOptions, 'contentTypeId')
			.setParams(this.contensisClient.getParams())
			.addMappers(listMappers)
			.toUrl();

		return this.contensisClient.ensureAuthenticationToken().then(() => {
			return this.httpClient.request<PagedList<Entry>>(url, {
				headers: this.contensisClient.getHeaders()
			});
		});
	}

	create(entry: Entry): Promise<Entry> {
		if (!entry) {
			throw new Error('A valid entry needs to be specified.');
		}

		if (!entry.sys || (!entry.sys.contentTypeId && !entry.sys.dataFormat)) {
			throw new Error('A valid entry content type id or data format value needs to be specified.');
		}

		let url = UrlBuilder.create('/api/management/projects/:projectId/entries',
			{})
			.setParams(this.contensisClient.getParams())
			.toUrl();
		return this.contensisClient.ensureAuthenticationToken().then(() => {
			return this.httpClient.request<Entry>(url, {
				headers: this.contensisClient.getHeaders(),
				method: 'POST',
				body: JSON.stringify(entry)
			});
		});
	}

	update(entry: Entry): Promise<Entry> {
		if (!entry) {
			throw new Error('A valid entry needs to be specified.');
		}

		if (!entry.sys || !entry.sys.id) {
			throw new Error('A valid entry id value needs to be specified.');
		}

		let url = UrlBuilder.create('/api/management/projects/:projectId/entries/:id',
			{})
			.addOptions(entry.sys.id, 'id')
			.setParams(this.contensisClient.getParams())
			.toUrl();

		return this.contensisClient.ensureAuthenticationToken().then(() => {
			return this.httpClient.request<Entry>(url, {
				headers: this.contensisClient.getHeaders(),
				method: 'PUT',
				body: JSON.stringify(entry)
			});
		});
	}
	createAsset(asset: Entry, assetFilePath: string, parentNodePath: string): Promise<Entry> {
		if (!asset) {
			throw new Error('A valid asset needs to be specified.');
		}

		if (!assetFilePath) {
			throw new Error('A valid asset file path needs to be specified.');
		}

		if (!parentNodePath) {
			throw new Error('A valid parent node path needs to be specified.');
		}

		if (!asset.sys || !asset.sys.dataFormat) {
			asset.sys = asset.sys || {};
			asset.sys.dataFormat = 'asset';
		}

		let form = new FormData();
		form.append('file', fs.createReadStream(assetFilePath));

		let url = UrlBuilder.create('/api/management/projects/:projectId/assets',
			{})
			.setParams(this.contensisClient.getParams())
			.toUrl();

		return this.contensisClient.ensureAuthenticationToken().then(() => {
			return this.httpClient.request<AssetUpload[]>(url, {
				headers: form.getHeaders(this.contensisClient.getHeaders(null)),
				method: 'POST',
				body: form as any
			})
				.then((assetUploads: AssetUpload[]) => {
					if (!assetUploads || assetUploads.length === 0) {
						throw new Error('The asset file could not be uploaded.');
					}

					let sysAssetFile: SysAssetFile = {
						fileId: assetUploads[0].fileId,
						parentNodePath: parentNodePath
					};
					asset.sysAssetFile = sysAssetFile;

					return this.create(asset);
				});
		});
	}

	updateAsset(asset: Entry, assetFilePath: string): Promise<Entry> {
		if (!asset) {
			throw new Error('A valid asset needs to be specified.');
		}

		if (!assetFilePath) {
			return this.update(asset);
		}

		let form = new FormData();
		form.append('file', fs.createReadStream(assetFilePath));

		let url = UrlBuilder.create('/api/management/projects/:projectId/assets',
			{})
			.setParams(this.contensisClient.getParams())
			.toUrl();

		return this.contensisClient.ensureAuthenticationToken().then(() => {
			return this.httpClient.request<AssetUpload[]>(url, {
				headers: form.getHeaders(this.contensisClient.getHeaders(null)),
				method: 'POST',
				body: form as any
			})
				.then((assetUploads: AssetUpload[]) => {
					if (!assetUploads || assetUploads.length === 0) {
						throw new Error('The asset file could not be uploaded.');
					}

					let sysAssetFile: SysAssetFile = {
						fileId: assetUploads[0].fileId
					};
					asset.sysAssetFile = sysAssetFile;

					return this.update(asset);
				});
		});
	}

	delete(id: string, languages: string[] = null): Promise<void> {
		if (!id) {
			throw new Error('A valid id needs to be specified.');
		}

		let url = UrlBuilder.create('/api/management/projects/:projectId/entries/:id',
			{ language: null })
			.addOptions(id, 'id')
			.addOptions(!!languages && languages.length > 0 ? languages.join(',') : null, 'language')
			.setParams(this.contensisClient.getParams())
			.toUrl();

		return this.contensisClient.ensureAuthenticationToken().then(() => {
			return this.httpClient.request<void>(url, {
				headers: this.contensisClient.getHeaders(),
				method: 'DELETE'
			});
		});
	}

	invokeWorkflow(entry: Entry, event: string, data: any = null): Promise<Entry> {
		if (!entry) {
			throw new Error('A valid entry needs to be specified.');
		}

		if (!entry.sys || !entry.sys.id) {
			throw new Error('A valid entry id value needs to be specified.');
		}

		if (!entry.sys.language) {
			throw new Error('A valid entry language value needs to be specified.');
		}

		if (!entry.sys.version || !entry.sys.version.versionNo) {
			throw new Error('A valid entry version number value needs to be specified.');
		}

		if (!event) {
			throw new Error('A valid event needs to be specified.');
		}

		let workflowTrigger: WorkflowTrigger = {
			language: entry.sys.language,
			version: entry.sys.version.versionNo,
			event,
			data
		};

		let url = UrlBuilder.create('/api/management/projects/:projectId/entries/:id/workflow/events',
			{})
			.addOptions(entry.sys.id, 'id')
			.setParams(this.contensisClient.getParams())
			.toUrl();

		return this.contensisClient.ensureAuthenticationToken().then(() => {
			return this.httpClient.request<Entry>(url, {
				headers: this.contensisClient.getHeaders(),
				method: 'POST',
				body: JSON.stringify(workflowTrigger)
			});
		});
	}
}
