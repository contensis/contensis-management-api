import { Config } from '../models';
import { Client } from './client';
import 'cross-fetch/polyfill';
/**
 * An universal client class that can be used on any platform (browser or a Node.js).
 */
export declare class UniversalClient extends Client {
    static create(config?: Config): UniversalClient;
    constructor(config?: Config);
}
