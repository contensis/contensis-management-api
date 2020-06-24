import { EntryOperations } from '../entries/entry-operations';
import { ContentTypeOperations } from '../content-types/content-type-operations';
import { ClientConfig } from './client-config';
import { NodeOperations } from '../nodes/node-operations';
import { HttpClient } from 'contensis-core-api';
import { ProjectOperations } from '../projects/project-operations';
import { RoleOperations } from '../roles/role-operations';
import { PermissionOperations } from '../permissions/permission-operations';
import { ComponentOperations } from '../components/component-operations';
import { GroupOperations } from '../groups/group-operations';
import { UserOperations } from '../users/user-operations';
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
        this.groups = new GroupOperations(this.httpClient, this);
        this.nodes = new NodeOperations(this.httpClient, this);
        this.permissions = new PermissionOperations(this.httpClient, this);
        this.projects = new ProjectOperations(this.httpClient, this);
        this.roles = new RoleOperations(this.httpClient, this);
        this.users = new UserOperations(this.httpClient, this);
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
        if (!!this.token && !!this.tokenExpiryDate) {
            const approxCurrentDate = new Date((new Date()).getTime() + 60 * 1000);
            if (approxCurrentDate < this.tokenExpiryDate) {
                return Promise.resolve(this.token);
            }
        }
        return this.authenticate()
            .then(() => this.token);
    }
    authenticate() {
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
            .then(async (response) => {
            let responseData = await response.json();
            return { response, responseData };
        })
            .then(responseAndData => {
            let { response, responseData } = responseAndData;
            if (!response.ok) {
                throw new Error('Authentication error: ' +
                    (!!responseData.error ? responseData.error : JSON.stringify(responseData)));
            }
            this.token = responseData.access_token;
            const expiresInSeconds = responseData.expires_in;
            const currentDate = new Date();
            this.tokenExpiryDate = new Date(currentDate.getTime() + expiresInSeconds * 1000);
        });
    }
    getAuthenticatePayload() {
        let payload = {
            scope: Scopes,
        };
        if (this.clientConfig.clientType !== 'none') {
            payload['grant_type'] = this.clientConfig.clientType;
        }
        if (this.clientConfig.clientType === 'token') {
            payload['token_value'] = this.clientConfig.clientDetails.tokenValue;
        }
        else if (this.clientConfig.clientType === 'password') {
            let clientDetails = this.clientConfig.clientDetails;
            payload['client_id'] = clientDetails.clientId;
            payload['username'] = clientDetails.username;
            payload['password'] = clientDetails.password;
            if (!!clientDetails.clientSecret) {
                payload['client_secret'] = clientDetails.clientSecret;
            }
        }
        else if (this.clientConfig.clientType === 'client_credentials') {
            let clientDetails = this.clientConfig.clientDetails;
            payload['client_id'] = clientDetails.clientId;
        }
        return payload;
    }
}
Client.defaultClientConfig = null;
