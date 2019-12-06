import fetch from 'cross-fetch';
import {
	Config, ContensisClient, IContentTypeOperations,
	IEntryOperations, INodeOperations, IProjectOperations
} from '../models';
import { EntryOperations } from '../entries/entry-operations';
import { ContentTypeOperations } from '../content-types/content-type-operations';
import { ClientConfig } from './client-config';
import { NodeOperations } from '../nodes/node-operations';
import { ClientParams, HttpClient, IHttpClient } from 'contensis-core-api';
import { ProjectOperations } from '../projects/project-operations';

const Scopes = 'Entry_Read Entry_Write Entry_Delete ContentType_Read Project_Read';

export class Client implements ContensisClient {

	static defaultClientConfig: ClientConfig = null;

	clientConfig: ClientConfig = null;
	entries: IEntryOperations;
	contentTypes: IContentTypeOperations;
	nodes: INodeOperations;
	projects: IProjectOperations;

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
		this.httpClient = new HttpClient(this);

		this.contentTypes = new ContentTypeOperations(this.httpClient, this);
		this.entries = new EntryOperations(this.httpClient, this);
		this.nodes = new NodeOperations(this.httpClient, this);
		this.projects = new ProjectOperations(this.httpClient, this);
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

		return fetch(`${this.clientConfig.rootUrl}/authenticate/connect/token`, {
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
				// console.log(response);
				this.token = response.access_token;
			});
	}
}
