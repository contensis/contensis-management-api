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
const cross_fetch_1 = require("cross-fetch");
const Scopes = 'ContentType_Read ContentType_Write ContentType_Delete Entry_Read Entry_Write Entry_Delete Project_Read Project_Write Project_Delete';
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
exports.Client = Client;
