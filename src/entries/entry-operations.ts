import {
	Entry, EntryGetOptions, EntryListOptions, IEntryOperations, ContensisClient, WorkflowTrigger
} from '../models';
import {
	AssetUpload, ClientParams, defaultMapperForLanguage, defaultMapperForLatestVersionStatus,
	IHttpClient, MapperFn, PagedList, SysAssetFile, UrlBuilder, isString, isBrowser, isIE
} from 'contensis-core-api';

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
	constructor(protected httpClient: IHttpClient, protected contensisClient: ContensisClient) {
	}

	get(idOrOptions: string | EntryGetOptions): Promise<Entry> {
		let url = UrlBuilder.create('/api/management/projects/:projectId/entries/:id',
			{ language: null, versionStatus: null, version: null })
			.addOptions(idOrOptions, 'id')
			.setParams(this.contensisClient.getParams())
			.addMappers(getMappers)
			.toUrl();

		return this.contensisClient.ensureBearerToken().then(() => {
			return this.httpClient.request<Entry>(url, {
				headers: this.contensisClient.getHeaders()
			});
		});
	}

	list(contentTypeIdOrOptions?: string | EntryListOptions): Promise<PagedList<Entry>> {
		let urlTemplate = '/api/management/projects/:projectId/contenttypes/:contentTypeId/entries';
		if (!contentTypeIdOrOptions || (!isString(contentTypeIdOrOptions) && !(contentTypeIdOrOptions as EntryListOptions).contentTypeId)) {
			urlTemplate = '/api/management/projects/:projectId/entries';
		}

		let url = UrlBuilder.create(urlTemplate,
			{ language: null, versionStatus: null, pageIndex: null, pageSize: null, order: null })
			.addOptions(contentTypeIdOrOptions, 'contentTypeId')
			.setParams(this.contensisClient.getParams())
			.addMappers(listMappers)
			.toUrl();

		return this.contensisClient.ensureBearerToken().then(() => {
			return this.httpClient.request<PagedList<Entry>>(url, {
				headers: this.contensisClient.getHeaders()
			});
		});
	}

	search(query: any): Promise<PagedList<Entry>> {
		if (!query) {
			return new Promise((resolve) => { resolve(null); });
		}

		let params = this.contensisClient.getParams();
		let pageSize = query.pageSize || params.pageSize;
		let pageIndex = query.pageIndex || 0;

		let orderBy = (query.orderBy && (query.orderBy._items || query.orderBy));

		let { clientType, clientDetails, projectId, language, responseHandler, rootUrl, versionStatus, ...requestParams } = params;

		let payload = {
			...requestParams,
			pageSize,
			pageIndex,
			where: JSON.stringify(query.where),
		};

		if (orderBy && orderBy.length > 0) {
			payload['orderBy'] = JSON.stringify(orderBy);
		}

		let url = UrlBuilder.create('/api/management/projects/:projectId/entries/search', { ...payload })
			.setParams({ ...(payload as any), projectId })
			.toUrl();

		let absoluteUrl = (!params.rootUrl || params.rootUrl === '/') ? url : params.rootUrl + url;
		if (isBrowser() && isIE() && absoluteUrl.length > 2083) {
			return this.searchUsingPost(query);
		}

		return this.contensisClient.ensureBearerToken().then(() => {
			return this.httpClient.request<PagedList<Entry>>(url, {
				method: 'GET',
				headers: this.contensisClient.getHeaders(),
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
		return this.contensisClient.ensureBearerToken().then(() => {
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

		return this.contensisClient.ensureBearerToken().then(() => {
			return this.httpClient.request<Entry>(url, {
				headers: this.contensisClient.getHeaders(),
				method: 'PUT',
				body: JSON.stringify(entry)
			});
		});
	}

	createAsset(asset: Entry, assetFilePath: string, parentNodePath: string): Promise<Entry> {
		throw new Error('This function can only be called in class EntryOperationsForServer.');
	}

	updateAsset(asset: Entry, assetFilePath: string): Promise<Entry> {
		throw new Error('This function can only be called in class EntryOperationsForServer.');
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

		return this.contensisClient.ensureBearerToken().then(() => {
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

		return this.invokeWorkflowByTrigger(entry, workflowTrigger);
	}

	invokeWorkflowByTrigger(entry: Entry, workflowTrigger: WorkflowTrigger): Promise<Entry> {
		if (!entry) {
			throw new Error('A valid entry needs to be specified.');
		}

		if (!entry.sys || !entry.sys.id) {
			throw new Error('A valid entry id value needs to be specified.');
		}

		if (!workflowTrigger) {
			throw new Error('A valid workflow trigger needs to be specified.');
		}

		let url = UrlBuilder.create('/api/management/projects/:projectId/entries/:id/workflow/events',
			{})
			.addOptions(entry.sys.id, 'id')
			.setParams(this.contensisClient.getParams())
			.toUrl();

		return this.contensisClient.ensureBearerToken().then(() => {
			return this.httpClient.request<Entry>(url, {
				headers: this.contensisClient.getHeaders(),
				method: 'POST',
				body: JSON.stringify(workflowTrigger)
			});
		});
	}

	private searchUsingPost(query: any): Promise<PagedList<Entry>> {
		if (!query) {
			return new Promise((resolve) => { resolve(null); });
		}

		let params = this.contensisClient.getParams();
		query.pageSize = query.pageSize || params.pageSize;
		query.pageIndex = query.pageIndex || 0;

		let url = UrlBuilder.create('/api/management/projects/:projectId/entries/search')
			.setParams(params)
			.toUrl();

		return this.contensisClient.ensureBearerToken().then(() => {
			return this.httpClient.request<PagedList<Entry>>(url, {
				method: 'POST',
				headers: this.contensisClient.getHeaders(),
				body: JSON.stringify(query)
			});
		});
	}

}
