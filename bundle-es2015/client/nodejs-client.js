import { EntryOperationsForServer } from '../entries/entry-operations-for-server';
import { Client } from './client';
import fetch from 'node-fetch';
/**
 * A Node.js client that can be used to perform server side actions like updating files.
 */
export class NodejsClient extends Client {
    static create(config = null) {
        return new NodejsClient(config);
    }
    constructor(config = null) {
        super(config, fetch);
        this.entries = new EntryOperationsForServer(this.httpClient, this);
    }
}
