import { EntryOperations } from '../entries/entry-operations';
import { ContentTypeOperations } from '../content-types/content-type-operations';
import { ClientConfig } from './client-config';
import { NodeOperations } from '../nodes/node-operations';
import { HttpClient } from 'contensis-core-api';
import { ProjectOperations } from '../projects/project-operations';
import { RoleOperations } from '../roles/role-operations';
import { PermissionOperations } from '../permissions/permission-operations';
import { ComponentOperations } from '../components/component-operations';
import fetch from 'cross-fetch';
const Scopes = 'ContentType_Read ContentType_Write ContentType_Delete Entry_Read Entry_Write Entry_Delete Project_Read Project_Write Project_Delete';
export class Client {
    constructor(config = null) {
        this.clientConfig = null;
        this.clientConfig = new ClientConfig(config, Client.defaultClientConfig);
        this.fetchFn = !this.clientConfig.fetchFn ? fetch : this.clientConfig.fetchFn;
        this.httpClient = new HttpClient(this, this.fetchFn);
        this.components = new ComponentOperations(this.httpClient, this);
        this.contentTypes = new ContentTypeOperations(this.httpClient, this);
        this.entries = new EntryOperations(this.httpClient, this);
        this.nodes = new NodeOperations(this.httpClient, this);
        this.permissions = new PermissionOperations(this.httpClient, this);
        this.projects = new ProjectOperations(this.httpClient, this);
        this.roles = new RoleOperations(this.httpClient, this);
    }
    static create(config = null) {
        return new Client(config);
    }
    static configure(config) {
        Client.defaultClientConfig = new ClientConfig(config, Client.defaultClientConfig);
    }
    getParams() {
        return this.clientConfig.toParams();
    }
    getHeaders(contentType = 'application/json') {
        let headers = {
            Authorization: `bearer ${this.token}`,
            Accept: 'application/json'
        };
        if (!!contentType) {
            headers['Content-Type'] = contentType;
        }
        return headers;
    }
    ensureAuthenticationToken() {
        return (!!this.token ? Promise.resolve(this.token) : this.authenticate().then(() => this.token));
    }
    authenticate() {
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
Client.defaultClientConfig = null;
