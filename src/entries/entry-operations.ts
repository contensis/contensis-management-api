import {
	EntryGetOptions, EntryListOptions, IEntryOperations, ContensisClient
} from '../models';
import {
	ClientParams, defaultMapperForLanguage, defaultMapperForLatestVersionStatus, Entry,
	IHttpClient, isBrowser, isIE, MapperFn, PagedList, UrlBuilder
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
		return this.httpClient.request<PagedList<Entry>>(url);
	}
}
