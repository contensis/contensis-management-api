import * as Contensis from '../index';
import { ClientConfig } from './client-config';
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
        let defaultSettings = new ClientConfig(null, null);
        expect(defaultSettings.rootUrl).toBeNull();
        expect(defaultSettings.clientId).toBeNull();
        expect(defaultSettings.clientSecret).toBeNull();
        expect(defaultSettings.projectId).toBeNull();
        expect(defaultSettings.pageIndex).toEqual(0);
        expect(defaultSettings.pageSize).toEqual(25);
        expect(defaultSettings.responseHandler).toBeNull();
    });
    it('Static Settable Default Settings', () => {
        Zengenti.Contensis.Client.configure({
            rootUrl: 'http://my-website.com/',
            clientId: 'XXXXXX',
            clientSecret: 'YYYYYY',
            projectId: 'myProject',
            pageIndex: 1,
            pageSize: 50,
            responseHandler: {}
        });
        expect(Zengenti.Contensis.Client.defaultClientConfig.projectId).toEqual('myProject');
        expect(Zengenti.Contensis.Client.defaultClientConfig.rootUrl).toEqual('http://my-website.com');
        expect(Zengenti.Contensis.Client.defaultClientConfig.clientId).toEqual('XXXXXX');
        expect(Zengenti.Contensis.Client.defaultClientConfig.clientSecret).toEqual('YYYYYY');
        expect(Zengenti.Contensis.Client.defaultClientConfig.pageIndex).toEqual(1);
        expect(Zengenti.Contensis.Client.defaultClientConfig.pageSize).toEqual(50);
        expect(Zengenti.Contensis.Client.defaultClientConfig.responseHandler).toEqual({});
    });
    it('Instance Default Settings', () => {
        Zengenti.Contensis.Client.configure({
            rootUrl: 'http://my-website.com/',
            clientId: 'YYYYYY',
            clientSecret: 'XXXXXX',
            projectId: 'myProject',
            pageIndex: 1,
            pageSize: 50
        });
        let client = Zengenti.Contensis.Client.create();
        let params = client.getParams();
        expect(params.rootUrl).toEqual('http://my-website.com');
        expect(params.clientId).toEqual('YYYYYY');
        expect(params.clientSecret).toEqual('XXXXXX');
        expect(params.projectId).toEqual('myProject');
        expect(params.pageIndex).toEqual(1);
        expect(params.pageSize).toEqual(50);
        expect(params.responseHandler).toBeNull();
    });
    it('Instance Settable Settings', () => {
        let client = Zengenti.Contensis.Client.create({
            rootUrl: 'http://my-website.com/',
            clientId: 'VVVVVV',
            clientSecret: 'ZZZZZZ',
            projectId: 'myProject',
            pageIndex: 2,
            pageSize: 100,
            responseHandler: {}
        });
        let params = client.getParams();
        expect(params.rootUrl).toEqual('http://my-website.com');
        expect(params.clientId).toEqual('VVVVVV');
        expect(params.clientSecret).toEqual('ZZZZZZ');
        expect(params.projectId).toEqual('myProject');
        expect(params.pageIndex).toEqual(2);
        expect(params.pageSize).toEqual(100);
        expect(params.responseHandler).toEqual({});
    });
});
