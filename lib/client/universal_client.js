"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
require("cross-fetch/polyfill");
/**
 * An universal client class that can be used on any platform (browser or a Node.js).
 */
class UniversalClient extends client_1.Client {
    static create(config = null) {
        return new UniversalClient(config);
    }
    constructor(config = null) {
        super(config, fetch);
    }
}
exports.UniversalClient = UniversalClient;
