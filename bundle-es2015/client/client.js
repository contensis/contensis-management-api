import { EntryOperations } from '../entries/entry-operations';
import { ContentTypeOperations } from '../content-types/content-type-operations';
import { ClientConfig } from './client-config';
import { NodeOperations } from '../nodes/node-operations';
import { HttpClient, ContensisAuthenticationError, ContensisApplicationError } from 'contensis-core-api';
import { ProjectOperations } from '../projects/project-operations';
import { RoleOperations } from '../roles/role-operations';
import { PermissionOperations } from '../permissions/permission-operations';
import { ComponentOperations } from '../components/component-operations';
import { GroupOperations, UserOperations, SecurityOperations } from '../security';
import * as Scopes from './scopes';
import { EventOperations } from '../events/events-operations';
const ContensisClassicTokenKey = 'x-contensis-classic-token';
/**
 * The core client class is designed to be used in modern browsers with minimal dpendencies, optimised for bundling.
 *
 * It can also be used on Node.js with a fetch module like 'node-fetch'.
 *
 * If no fetchFn value is provided it will assume it runs in a modern browser and fetch is already available.
 */
export class Client {
    constructor(config = null, fetchFn = null) {
        this.fetchFn = fetchFn;
        this.clientConfig = null;
        if (!this.fetchFn && !!window) {
            this.fetchFn = window.fetch.bind(window);
        }
        this.clientConfig = new ClientConfig(config, Client.defaultClientConfig);
        if (!!this.clientConfig.fetchFn) {
            this.fetchFn = this.clientConfig.fetchFn;
        }
        this.httpClient = new HttpClient(this, this.fetchFn);
        this.components = new ComponentOperations(this.httpClient, this);
        this.contentTypes = new ContentTypeOperations(this.httpClient, this);
        this.entries = new EntryOperations(this.httpClient, this);
        this.events = new EventOperations(this.httpClient, this);
        this.nodes = new NodeOperations(this.httpClient, this);
        this.permissions = new PermissionOperations(this.httpClient, this);
        this.projects = new ProjectOperations(this.httpClient, this);
        this.roles = new RoleOperations(this.httpClient, this);
        this.security = new SecurityOperations(new UserOperations(this.httpClient, this), new GroupOperations(this.httpClient, this));
    }
    static create(config = null, fetchFn = null) {
        return new Client(config, fetchFn);
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
            .then(() => this.bearerToken)
            .catch((error) => {
            if (error instanceof ContensisAuthenticationError) {
                throw error;
            }
            throw new ContensisApplicationError(error.message);
        });
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
                throw new ContensisAuthenticationError(!!responseData.error ? responseData.error : JSON.stringify(responseData));
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
            if (!!response.headers && response.headers.has(ContensisClassicTokenKey)) {
                this.contensisClassicToken = response.headers.get(ContensisClassicTokenKey);
            }
            else {
                this.contensisClassicToken = null;
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
