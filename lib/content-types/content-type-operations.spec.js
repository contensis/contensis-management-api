"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contensis = require("../index");
const specs_utils_spec_1 = require("../specs-utils.spec");
const cross_fetch_1 = require("cross-fetch");
const Zengenti = { Contensis };
const global = window || this;
global.fetch = cross_fetch_1.default;
describe('Content Type Operations', () => {
    describe('Get content type', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, {
                name: { 'en-GB': 'contentType1' }
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('by id', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let contentType = await client.contentTypes.get('movie');
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/contenttypes/movie?versionStatus=published',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(contentType).not.toBeNull();
            expect(contentType.name['en-GB']).toEqual('contentType1');
        });
        it('with options', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let contentType = await client.contentTypes.get({
                id: 'movie',
                versionStatus: 'latest',
                version: '2.3'
            });
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/contenttypes/movie?version=2.3',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(contentType).not.toBeNull();
            expect(contentType.name['en-GB']).toEqual('contentType1');
        });
    });
    describe('List content types', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, [{
                    name: { 'en-GB': 'contentType1' }
                }, {
                    name: { 'en-GB': 'contentType2' }
                }]);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('With default options', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let contentTypes = await client.contentTypes.list();
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/contenttypes?versionStatus=published',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(contentTypes).not.toBeNull();
            expect(contentTypes.length).toEqual(2);
            expect(contentTypes[1].name['en-GB']).toEqual('contentType2');
        });
        it('With specific options', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let contenttypes = await client.contentTypes.list({
                versionStatus: 'latest',
                dataFormat: 'entry'
            });
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/contenttypes?dataFormat=entry',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(contenttypes).not.toBeNull();
            expect(contenttypes.length).toEqual(2);
            expect(contenttypes[1].name['en-GB']).toEqual('contentType2');
        });
    });
});
