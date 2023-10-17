"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contensis = require("../index");
const specs_utils_spec_1 = require("../specs-utils.spec");
const cross_fetch_1 = require("cross-fetch");
const Zengenti = { Contensis };
const global = window || this;
global.fetch = cross_fetch_1.default;
describe('Redirect Operations', () => {
    describe('Get redirect', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, {
                id: 'redirect1',
                sourceDomain: 'www.example.co.uk',
                destination: 'https://www.example.com',
                statusCode: 301,
                appendSourcePathToDestination: true,
                match: {
                    type: 'beginsWith',
                    value: '/',
                },
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch,
            });
        });
        it('by id', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let redirect = await client.redirects.get('myRedirectId');
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/redirects/myRedirectId',
                (0, specs_utils_spec_1.getDefaultFetchRequest)(),
            ]);
            expect(redirect).not.toBeNull();
            expect(redirect.id).toEqual('redirect1');
        });
    });
    describe('List redirects', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: [
                    {
                        id: 'redirect1',
                    },
                    {
                        id: 'redirect2',
                    },
                ],
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch,
            });
        });
        it('with default options', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let redirects = await client.redirects.list();
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/redirects/?pageIndex=0&pageSize=25',
                (0, specs_utils_spec_1.getDefaultFetchRequest)(),
            ]);
            expect(redirects).not.toBeNull();
            expect(redirects.items.length).toEqual(2);
            expect(redirects.items[1].id).toEqual('redirect2');
        });
        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let redirects = await client.redirects.list({
                pageIndex: 1,
                pageSize: 50,
            });
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/redirects/?pageIndex=1&pageSize=50',
                (0, specs_utils_spec_1.getDefaultFetchRequest)(),
            ]);
            expect(redirects).not.toBeNull();
            expect(redirects.items.length).toEqual(2);
            expect(redirects.items[1].id).toEqual('redirect2');
        });
    });
});
