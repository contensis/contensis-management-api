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
import * as Scopes from './scopes';
import fetch from 'cross-fetch';
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
            Authorization: `bearer ${this.bearerToken}`,
            Accept: 'application/json'
        };
        if (!!contentType) {
            headers['Content-Type'] = contentType;
        }
        return headers;
    }
    isBearerTokenExpired() {
        if (!!this.bearerToken && !!this.bearerTokenExpiryDate) {
            const approxCurrentDate = new Date((new Date()).getTime() + 60 * 1000);
            if (approxCurrentDate < this.bearerTokenExpiryDate) {
                return false;
            }
        }
        return true;
    }
    isRefreshTokenExpired() {
        if (!!this.refreshToken && !!this.refreshTokenExpiryDate) {
            const approxCurrentDate = new Date((new Date()).getTime() + 60 * 1000);
            if (approxCurrentDate < this.refreshTokenExpiryDate) {
                return false;
            }
        }
        return true;
    }
    ensureBearerToken() {
        if (!this.isBearerTokenExpired()) {
            return Promise.resolve(this.bearerToken);
        }
        return this.authenticate()
            .then(() => this.bearerToken);
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
            this.bearerToken = responseData.access_token;
            const expiresInSeconds = responseData.expires_in;
            const currentDate = new Date();
            this.bearerTokenExpiryDate = new Date(currentDate.getTime() + expiresInSeconds * 1000);
            if (!!responseData.refresh_token) {
                this.refreshToken = responseData.refresh_token;
                this.refreshTokenExpiryDate = new Date(currentDate.getTime() + 15 * 24 * 3600 * 1000); // 15 days
            }
            else {
                this.refreshToken = null;
                this.refreshTokenExpiryDate = null;
            }
        });
    }
    getAuthenticatePayload() {
        let payload = {
            scope: this.clientConfig.clientType === 'client_credentials' ? Scopes.getResourcesScopes() : Scopes.getAllScopes(),
        };
        if (this.clientConfig.clientType !== 'none') {
            payload['grant_type'] = this.clientConfig.clientType;
        }
        if (this.clientConfig.clientType === 'client_credentials') {
            let clientDetails = this.clientConfig.clientDetails;
            payload['client_id'] = clientDetails.clientId;
            payload['client_secret'] = clientDetails.clientSecret;
        }
        else if (this.clientConfig.clientType === 'contensis_classic') {
            let clientDetails = this.clientConfig.clientDetails;
            payload['username'] = clientDetails.username;
            payload['password'] = clientDetails.password;
        }
        else if (this.clientConfig.clientType === 'contensis_classic_refresh_token') {
            let clientDetails = this.clientConfig.clientDetails;
            payload['refresh_token'] = clientDetails.refreshToken;
        }
        return payload;
    }
}
Client.defaultClientConfig = null;
