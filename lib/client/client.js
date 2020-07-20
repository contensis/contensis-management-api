"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entry_operations_1 = require("../entries/entry-operations");
const content_type_operations_1 = require("../content-types/content-type-operations");
const client_config_1 = require("./client-config");
const node_operations_1 = require("../nodes/node-operations");
const contensis_core_api_1 = require("contensis-core-api");
const project_operations_1 = require("../projects/project-operations");
const role_operations_1 = require("../roles/role-operations");
const permission_operations_1 = require("../permissions/permission-operations");
const component_operations_1 = require("../components/component-operations");
const group_operations_1 = require("../groups/group-operations");
const user_operations_1 = require("../users/user-operations");
const Scopes = require("./scopes");
const cross_fetch_1 = require("cross-fetch");
const ContensisClassicTokenKey = 'x-contensis-classic-token';
class Client {
    constructor(config = null) {
        this.clientConfig = null;
        this.clientConfig = new client_config_1.ClientConfig(config, Client.defaultClientConfig);
        this.fetchFn = !this.clientConfig.fetchFn ? cross_fetch_1.default : this.clientConfig.fetchFn;
        this.httpClient = new contensis_core_api_1.HttpClient(this, this.fetchFn);
        this.components = new component_operations_1.ComponentOperations(this.httpClient, this);
        this.contentTypes = new content_type_operations_1.ContentTypeOperations(this.httpClient, this);
        this.entries = new entry_operations_1.EntryOperations(this.httpClient, this);
        this.groups = new group_operations_1.GroupOperations(this.httpClient, this);
        this.nodes = new node_operations_1.NodeOperations(this.httpClient, this);
        this.permissions = new permission_operations_1.PermissionOperations(this.httpClient, this);
        this.projects = new project_operations_1.ProjectOperations(this.httpClient, this);
        this.roles = new role_operations_1.RoleOperations(this.httpClient, this);
        this.users = new user_operations_1.UserOperations(this.httpClient, this);
    }
    static create(config = null) {
        return new Client(config);
    }
    static configure(config) {
        Client.defaultClientConfig = new client_config_1.ClientConfig(config, Client.defaultClientConfig);
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
exports.Client = Client;
