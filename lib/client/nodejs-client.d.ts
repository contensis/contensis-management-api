import { Config } from '../models';
import { Client } from './client';
/**
 * A Node.js client that can be used to perform server side actions like updating files.
 */
export declare class NodejsClient extends Client {
    static create(config?: Config): NodejsClient;
    constructor(config?: Config);
}
