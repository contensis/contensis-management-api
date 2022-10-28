"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodejsClient = void 0;
const entry_operations_for_server_1 = require("../entries/entry-operations-for-server");
const client_1 = require("./client");
const node_fetch_1 = require("node-fetch");
/**
 * A Node.js client that can be used to perform server side actions like updating files.
 */
class NodejsClient extends client_1.Client {
    static create(config = null) {
        return new NodejsClient(config);
    }
    constructor(config = null) {
        super(config, node_fetch_1.default);
        this.entries = new entry_operations_for_server_1.EntryOperationsForServer(this.httpClient, this);
    }
}
exports.NodejsClient = NodejsClient;
