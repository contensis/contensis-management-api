import {
	Config, ContensisClient, IContentTypeOperations,
	IEntryOperations, INodeOperations, IProjectOperations, IRoleOperations, IPermissionOperations, IComponentOperations, IGroupOperations, IUserOperations
} from '../models';
import { EntryOperations } from '../entries/entry-operations';
import { ContentTypeOperations } from '../content-types/content-type-operations';
import { ClientConfig } from './client-config';
import { NodeOperations } from '../nodes/node-operations';
import { ClientParams, HttpClient, IHttpClient } from 'contensis-core-api';
import { ProjectOperations } from '../projects/project-operations';
import { RoleOperations } from '../roles/role-operations';
import { PermissionOperations } from '../permissions/permission-operations';
import { ComponentOperations } from '../components/component-operations';
import { GroupOperations } from '../groups/group-operations';
import { UserOperations } from '../users/user-operations';
import fetch from 'cross-fetch';

const Scopes = 'ContentType_Read ContentType_Write ContentType_Delete Entry_Read Entry_Write Entry_Delete Project_Read Project_Write Project_Delete';

export class Client implements ContensisClient {

	static defaultClientConfig: ClientConfig = null;

	clientConfig: ClientConfig = null;
	fetchFn: (input: RequestInfo, init?: RequestInit) => Promise<Response>;

	components: IComponentOperations;
	contentTypes: IContentTypeOperations;
	entries: IEntryOperations;
	groups: IGroupOperations;
	nodes: INodeOperations;
	permissions: IPermissionOperations;
	projects: IProjectOperations;
	roles: IRoleOperations;
	users: IUserOperations;


	private httpClient: IHttpClient;
	private token: string;

	static create(config: Config = null): Client {
		return new Client(config);
	}

	static configure(config: Config) {
		Client.defaultClientConfig = new ClientConfig(config, Client.defaultClientConfig);
	}

	constructor(config: Config = null) {
		this.clientConfig = new ClientConfig(config, Client.defaultClientConfig);
		this.fetchFn = !this.clientConfig.fetchFn ? fetch : this.clientConfig.fetchFn;
		this.httpClient = new HttpClient(this, this.fetchFn);

		this.components = new ComponentOperations(this.httpClient, this);
		this.contentTypes = new ContentTypeOperations(this.httpClient, this);
		this.entries = new EntryOperations(this.httpClient, this);
		this.groups = new GroupOperations(this.httpClient, this);
		this.nodes = new NodeOperations(this.httpClient, this);
		this.permissions = new PermissionOperations(this.httpClient, this);
		this.projects = new ProjectOperations(this.httpClient, this);
		this.roles = new RoleOperations(this.httpClient, this);
		this.users = new UserOperations(this.httpClient, this);
	}

	public getParams(): ClientParams {
		return this.clientConfig.toParams();
	}

	public getHeaders(contentType: string = 'application/json'): { [key: string]: string } {
		let headers = {
			Authorization: `bearer ${this.token}`,
			Accept: 'application/json'
		};

		if (!!contentType) {
			headers['Content-Type'] = contentType;
		}

		return headers;
	}

	public ensureAuthenticationToken(): Promise<string> {
		return (!!this.token ? Promise.resolve(this.token) : this.authenticate().then(() => this.token));
	}

	private authenticate(): Promise<void> {
		const AuthPayload = {
			grant_type: 'client_credentials',
			client_id: this.clientConfig.clientId,
			client_secret: this.clientConfig.clientSecret,
			scope: Scopes,
		};

		const AuthData = Object.keys(AuthPayload)
			.map(key => {
				return encodeURIComponent(key) + '=' + encodeURIComponent(AuthPayload[key]);
			})
			.join('&');

		let rootUrl = !!this.clientConfig.rootUrl ? this.clientConfig.rootUrl : '';
		return this.fetchFn(`${rootUrl}/authenticate/connect/token`, {
			method: 'POST',
			// mode: 'cors',
			// cache: 'no-cache',
			// credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			},
			body: AuthData,
		})
			.then(response => response.json())
			.then(response => {
				this.token = response.access_token;
			});
	}
}
