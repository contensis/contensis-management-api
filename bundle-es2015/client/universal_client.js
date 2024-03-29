import { Client } from './client';
import 'cross-fetch/polyfill';
/**
 * An universal client class that can be used on any platform (browser or a Node.js).
 */
export class UniversalClient extends Client {
    static create(config = null) {
        return new UniversalClient(config);
    }
    constructor(config = null) {
        super(config, fetch);
    }
}
