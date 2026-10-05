"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contensis = require("../index");
const client_config_1 = require("./client-config");
const Zengenti = { Contensis };
const global = window || this;
describe('Contensis Client', function () {
    beforeEach(() => {
        Zengenti.Contensis.Client.defaultClientConfig = null;
        spyOn(global, 'fetch').and.callFake((...args) => {
            return new Promise((resolve, reject) => {
                resolve({
                    json: () => {
                        return {
                            items: []
                        };
                    }
                });
            });
        });
    });
    it('Zengenti exists', () => {
        expect(Zengenti).toBeDefined();
    });
    it('Contensis exists', () => {
        expect(Zengenti.Contensis).toBeDefined();
    });
    it('Contensis Client exists', () => {
        expect(Zengenti.Contensis.Client).toBeDefined();
    });
    it('Contensis Client create exists', () => {
        expect(Zengenti.Contensis.Client.create).toBeDefined();
    });
    it('Static Initial Default Settings', () => {
        let defaultSettings = new client_config_1.ClientConfig(null, null);
        expect(defaultSettings.rootUrl).toBeNull();
        expect(defaultSettings.clientType).toBeNull();
        expect(defaultSettings.clientDetails).toBeNull();
        expect(defaultSettings.projectId).toBeNull();
        expect(defaultSettings.pageIndex).toEqual(0);
        expect(defaultSettings.pageSize).toEqual(25);
        expect(defaultSettings.responseHandler).toBeNull();
    });
    describe('Client type set to "client_credentials"', () => {
        it('Static Settable Default Settings', () => {
            Zengenti.Contensis.Client.configure({
                rootUrl: 'http://my-website.com/',
                clientType: 'client_credentials',
                clientDetails: {
                    clientId: 'XXXXXX',
                    clientSecret: 'YYYYYY',
                },
                projectId: 'myProject',
                pageIndex: 1,
                pageSize: 50,
                responseHandler: {}
            });
            expect(Zengenti.Contensis.Client.defaultClientConfig.projectId).toEqual('myProject');
            expect(Zengenti.Contensis.Client.defaultClientConfig.rootUrl).toEqual('http://my-website.com');
            expect(Zengenti.Contensis.Client.defaultClientConfig.clientType).toEqual('client_credentials');
            expect(Zengenti.Contensis.Client.defaultClientConfig.clientDetails).toEqual(Object({
                clientId: 'XXXXXX',
                clientSecret: 'YYYYYY',
            }));
            expect(Zengenti.Contensis.Client.defaultClientConfig.pageIndex).toEqual(1);
            expect(Zengenti.Contensis.Client.defaultClientConfig.pageSize).toEqual(50);
            expect(Zengenti.Contensis.Client.defaultClientConfig.responseHandler).toEqual({});
        });
        it('Instance Default Settings', () => {
            Zengenti.Contensis.Client.configure({
                rootUrl: 'http://my-website.com/',
                clientType: 'client_credentials',
                clientDetails: {
                    clientId: 'YYYYYY',
                    clientSecret: 'XXXXXX',
                },
                projectId: 'myProject',
                pageIndex: 1,
                pageSize: 50
            });
            let client = Zengenti.Contensis.Client.create();
            let params = client.getParams();
            expect(params.rootUrl).toEqual('http://my-website.com');
            expect(params.clientType).toEqual('client_credentials');
            expect(params.clientDetails).toEqual(Object({
                clientId: 'YYYYYY',
                clientSecret: 'XXXXXX'
            }));
            expect(params.projectId).toEqual('myProject');
            expect(params.pageIndex).toEqual(1);
            expect(params.pageSize).toEqual(50);
            expect(params.responseHandler).toBeNull();
        });
        it('Instance Settable Settings', () => {
            let client = Zengenti.Contensis.Client.create({
                rootUrl: 'http://my-website.com/',
                clientType: 'client_credentials',
                clientDetails: {
                    clientId: 'VVVVVV',
                    clientSecret: 'ZZZZZZ'
                },
                projectId: 'myProject',
                pageIndex: 2,
                pageSize: 100,
                responseHandler: {}
            });
            let params = client.getParams();
            expect(params.rootUrl).toEqual('http://my-website.com');
            expect(params.clientType).toEqual('client_credentials');
            expect(params.clientDetails).toEqual(Object({
                clientId: 'VVVVVV',
                clientSecret: 'ZZZZZZ'
            }));
            expect(params.projectId).toEqual('myProject');
            expect(params.pageIndex).toEqual(2);
            expect(params.pageSize).toEqual(100);
            expect(params.responseHandler).toEqual({});
        });
    });
    describe('Client type set to "classic"', () => {
        it('Static Settable Default Settings', () => {
            Zengenti.Contensis.Client.configure({
                rootUrl: 'http://my-website.com/',
                clientType: 'contensis_classic',
                clientDetails: {
                    username: 'XXXXXX',
                    password: 'YYYYYY',
                },
                projectId: 'myProject',
                pageIndex: 1,
                pageSize: 50,
                responseHandler: {}
            });
            expect(Zengenti.Contensis.Client.defaultClientConfig.projectId).toEqual('myProject');
            expect(Zengenti.Contensis.Client.defaultClientConfig.rootUrl).toEqual('http://my-website.com');
            expect(Zengenti.Contensis.Client.defaultClientConfig.clientType).toEqual('contensis_classic');
            expect(Zengenti.Contensis.Client.defaultClientConfig.clientDetails).toEqual(Object({
                username: 'XXXXXX',
                password: 'YYYYYY',
            }));
            expect(Zengenti.Contensis.Client.defaultClientConfig.pageIndex).toEqual(1);
            expect(Zengenti.Contensis.Client.defaultClientConfig.pageSize).toEqual(50);
            expect(Zengenti.Contensis.Client.defaultClientConfig.responseHandler).toEqual({});
        });
        it('Instance Default Settings', () => {
            Zengenti.Contensis.Client.configure({
                rootUrl: 'http://my-website.com/',
                clientType: 'contensis_classic',
                clientDetails: {
                    username: 'YYYYYY',
                    password: 'XXXXXX',
                },
                projectId: 'myProject',
                pageIndex: 1,
                pageSize: 50
            });
            let client = Zengenti.Contensis.Client.create();
            let params = client.getParams();
            expect(params.rootUrl).toEqual('http://my-website.com');
            expect(params.clientType).toEqual('contensis_classic');
            expect(params.clientDetails).toEqual(Object({
                username: 'YYYYYY',
                password: 'XXXXXX'
            }));
            expect(params.projectId).toEqual('myProject');
            expect(params.pageIndex).toEqual(1);
            expect(params.pageSize).toEqual(50);
            expect(params.responseHandler).toBeNull();
        });
        it('Instance Settable Settings', () => {
            let client = Zengenti.Contensis.Client.create({
                rootUrl: 'http://my-website.com/',
                clientType: 'contensis_classic',
                clientDetails: {
                    username: 'VVVVVV',
                    password: 'ZZZZZZ'
                },
                projectId: 'myProject',
                pageIndex: 2,
                pageSize: 100,
                responseHandler: {}
            });
            let params = client.getParams();
            expect(params.rootUrl).toEqual('http://my-website.com');
            expect(params.clientType).toEqual('contensis_classic');
            expect(params.clientDetails).toEqual(Object({
                username: 'VVVVVV',
                password: 'ZZZZZZ'
            }));
            expect(params.projectId).toEqual('myProject');
            expect(params.pageIndex).toEqual(2);
            expect(params.pageSize).toEqual(100);
            expect(params.responseHandler).toEqual({});
        });
    });
});
