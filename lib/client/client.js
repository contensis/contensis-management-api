"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cross_fetch_1 = require("cross-fetch");
const entry_operations_1 = require("../entries/entry-operations");
const content_type_operations_1 = require("../content-types/content-type-operations");
const client_config_1 = require("./client-config");
const node_operations_1 = require("../nodes/node-operations");
const contensis_core_api_1 = require("contensis-core-api");
const project_operations_1 = require("../projects/project-operations");
const Scopes = 'Entry_Read Entry_Write Entry_Delete ContentType_Read Project_Read';
class Client {
    constructor(config = null) {
        this.clientConfig = null;
        this.clientConfig = new client_config_1.ClientConfig(config, Client.defaultClientConfig);
        this.httpClient = new contensis_core_api_1.HttpClient(this);
        this.contentTypes = new content_type_operations_1.ContentTypeOperations(this.httpClient, this);
        this.entries = new entry_operations_1.EntryOperations(this.httpClient, this);
        this.nodes = new node_operations_1.NodeOperations(this.httpClient, this);
        this.projects = new project_operations_1.ProjectOperations(this.httpClient, this);
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
        return cross_fetch_1.default(`${this.clientConfig.rootUrl}/authenticate/connect/token`, {
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
Client.defaultClientConfig = null;
exports.Client = Client;
