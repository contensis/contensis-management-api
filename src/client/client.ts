import {
	Config, ContensisClient, IContentTypeOperations,
	IEntryOperations, INodeOperations, IProjectOperations, IRoleOperations, IPermissionOperations, IComponentOperations, IGroupOperations, IUserOperations
} from '../models';
import { EntryOperations } from '../entries/entry-operations';
import { ContentTypeOperations } from '../content-types/content-type-operations';
import { ClientConfig } from './client-config';
import { NodeOperations } from '../nodes/node-operations';
import { ClientParams, HttpClient, IHttpClient, ContensisClassicGrant, ClientCredentialsGrant, ContensisClassicResfreshTokenGrant } from 'contensis-core-api';
import { ProjectOperations } from '../projects/project-operations';
import { RoleOperations } from '../roles/role-operations';
import { PermissionOperations } from '../permissions/permission-operations';
import { ComponentOperations } from '../components/component-operations';
import { GroupOperations } from '../groups/group-operations';
import { UserOperations } from '../users/user-operations';
import * as Scopes from './scopes';

import fetch from 'cross-fetch';


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

	bearerToken: string;
	bearerTokenExpiryDate: Date;
	refreshToken?: string;

	private httpClient: IHttpClient;

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
			Authorization: `bearer ${this.bearerToken}`,
			Accept: 'application/json'
		};

		if (!!contentType) {
			headers['Content-Type'] = contentType;
		}

		return headers;
	}

	public ensureAuthenticationToken(): Promise<string> {
		if (!!this.bearerToken && !!this.bearerTokenExpiryDate) {
			const approxCurrentDate = new Date((new Date()).getTime() + 60 * 1000);
			if (approxCurrentDate < this.bearerTokenExpiryDate) {
				return Promise.resolve(this.bearerToken);
			}
		}
		return this.authenticate()
			.then(() => this.bearerToken);
	}

	private authenticate(): Promise<void> {
		const AuthPayload = this.getAuthenticatePayload();

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
			.then(async response => {
				let responseData = await response.json();
				return { response, responseData };
			})
			.then(responseAndData => {
				let { response, responseData } = responseAndData;
				if (!response.ok) {
					throw new Error('Authentication error: ' +
						(!!responseData.error ? responseData.error : JSON.stringify(responseData)));
				}

				this.bearerToken = responseData.access_token;
				const expiresInSeconds = responseData.expires_in;
				const currentDate = new Date();
				this.bearerTokenExpiryDate = new Date(currentDate.getTime() + expiresInSeconds * 1000);
				if (!!responseData.refresh_token) {
					this.refreshToken = responseData.refresh_token;
				} else {
					this.refreshToken = null;
				}
			});
	}

	private getAuthenticatePayload() {
		let payload = {
			scope: this.clientConfig.clientType === 'client_credentials' ? Scopes.getResourcesScopes() : Scopes.getAllScopes(),
		};

		if (this.clientConfig.clientType !== 'none') {
			payload['grant_type'] = this.clientConfig.clientType;
		}

		if (this.clientConfig.clientType === 'client_credentials') {
			let clientDetails = this.clientConfig.clientDetails as ClientCredentialsGrant;
			payload['client_id'] = clientDetails.clientId;
			payload['client_secret'] = clientDetails.clientSecret;
		} else if (this.clientConfig.clientType === 'contensis_classic') {
			let clientDetails = this.clientConfig.clientDetails as ContensisClassicGrant;
			payload['username'] = clientDetails.username;
			payload['password'] = clientDetails.password;

		} else if (this.clientConfig.clientType === 'contensis_classic_refresh_token') {
			let clientDetails = this.clientConfig.clientDetails as ContensisClassicResfreshTokenGrant;
			payload['refresh_token'] = clientDetails.refreshToken;
		}

		return payload;
	}
}
