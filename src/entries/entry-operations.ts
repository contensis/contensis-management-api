import {
	Entry, EntryGetOptions, EntryListOptions, EntryUsageInfo, EntryUsageOptions, IEntryOperations, ContensisClient, WorkflowTrigger
} from '../models';
import {
	AssetUpload, ClientParams, defaultMapperForLanguage, defaultMapperForLatestVersionStatus,
	IHttpClient, MapperFn, PagedList, SysAssetFile, UrlBuilder, isString, isBrowser, isIE, ManagementQuery, ManagementZenqlQuery
} from 'contensis-core-api';

const defaultListUrl = '/api/management/projects/:projectId/entries';

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

const usageListMappers: { [key: string]: MapperFn } = {
	language: defaultMapperForLanguage,
	versionStatus: defaultMapperForLatestVersionStatus,
	pageIndex: (value: number, options: EntryListOptions, params: ClientParams) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
	pageSize: (value: number, options: EntryListOptions, params: ClientParams) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
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
			urlTemplate = defaultListUrl;
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

	search(query: string | ManagementQuery | ManagementZenqlQuery): Promise<PagedList<Entry>> {
		if (!query) {
			return new Promise((resolve) => { resolve(null); });
		}

		let managementQuery = query instanceof ManagementQuery ? query as ManagementQuery : null;
		// use duck-typing for backwards compatibility pre v2.0.7
		if (managementQuery !== null || !!(query as any).where || !!(query as any).orderBy) {
			return this.searchUsingManagementQuery(managementQuery || (query as any));
		}

		let zenqlQuery: ManagementZenqlQuery = query instanceof ManagementZenqlQuery ? query as ManagementZenqlQuery : null;
		if (zenqlQuery === null) {
			if (typeof query === 'string') {
				zenqlQuery = new ManagementZenqlQuery(query);
			} else {
				throw new Error('A valid query needs to be specified.');
			}
		}

		let params = this.contensisClient.getParams();
		let pageSize = params.pageSize || 25;
		let pageIndex = params.pageIndex || 0;

		pageSize = zenqlQuery.pageSize || pageSize;
		pageIndex = zenqlQuery.pageIndex || pageIndex;

		let includeArchived = zenqlQuery.includeArchived ? true : null;
		let includeDeleted = zenqlQuery.includeDeleted ? true : null;

		let { clientType, clientDetails, projectId, language, responseHandler, rootUrl, versionStatus, ...requestParams } = params;

		let payload = {
			...requestParams,
			includeArchived,
			includeDeleted,
			pageSize,
			pageIndex,
			zenql: zenqlQuery.zenql
		};

		let url = UrlBuilder.create(defaultListUrl, { ...payload })
			.setParams({ ...(payload as any), projectId })
			.toUrl();

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

	getUsage(idOrOptions: string | EntryUsageOptions): Promise<PagedList<EntryUsageInfo>> {
		let url = UrlBuilder.create('/api/management/projects/:projectId/entries/:id/usage',
			{ language: null, versionStatus: null, version: null, pageIndex: null, pageSize: null })
			.addOptions(idOrOptions, 'id')
			.setParams(this.contensisClient.getParams())
			.addMappers(usageListMappers)
			.toUrl();

		return this.contensisClient.ensureBearerToken().then(() => {
			return this.httpClient.request<PagedList<EntryUsageInfo>>(url, {
				headers: this.contensisClient.getHeaders()
			});
		});
	}

	createAsset(asset: Entry, assetFilePath: string, parentNodePath: string): Promise<Entry> {
		throw new Error('This function can only be called in class EntryOperationsForServer.');
	}

	updateAsset(asset: Entry, assetFilePath: string): Promise<Entry> {
		throw new Error('This function can only be called in class EntryOperationsForServer.');
	}

	delete(id: string, languages: string[] = null, permanent = false): Promise<void> {
		if (!id) {
			throw new Error('A valid id needs to be specified.');
		}

		let url = UrlBuilder.create('/api/management/projects/:projectId/entries/:id',
			{
				language: null,
				permanent: null,
			})
			.addOptions(id, 'id')
			.addOptions(!!languages && languages.length > 0 ? languages.join(',') : null, 'language')
			.addOptions(permanent ? 'true' : null, 'permanent')
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

	private searchUsingManagementQuery(query: ManagementQuery): Promise<PagedList<Entry>> {
		if (!query) {
			return new Promise((resolve) => { resolve(null); });
		}

		let managementQuery = query as ManagementQuery;
		let params = this.contensisClient.getParams();
		let pageSize = query.pageSize || params.pageSize;
		let pageIndex = query.pageIndex || 0;

		let orderBy = (managementQuery.orderBy && ((managementQuery.orderBy as any)._items || managementQuery.orderBy));

		let includeArchived = managementQuery.includeArchived ? true : null;
		let includeDeleted = managementQuery.includeDeleted ? true : null;

		let { clientType, clientDetails, projectId, language, responseHandler, rootUrl, versionStatus, ...requestParams } = params;

		let payload = {
			...requestParams,
			includeArchived,
			includeDeleted,
			pageSize,
			pageIndex,
			where: JSON.stringify(query.where),
		};

		if (managementQuery.orderBy && (!Array.isArray(managementQuery.orderBy) || (managementQuery.orderBy as any).length > 0)) {
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
