"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contensis = require("../index");
const specs_utils_spec_1 = require("../specs-utils.spec");
const cross_fetch_1 = require("cross-fetch");
const Zengenti = { Contensis };
const global = window || this;
global.fetch = cross_fetch_1.default;
describe('Component Operations', () => {
    describe('Get component', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, {
                name: { 'en-GB': 'component1' }
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('by id', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let component = await client.components.get('movie');
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/components/movie?versionStatus=published',
                specs_utils_spec_1.getDefaultRequest()
            ]);
            expect(component).not.toBeNull();
            expect(component.name['en-GB']).toEqual('component1');
        });
        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let component = await client.components.get({
                id: 'movie',
                versionStatus: 'latest',
                version: '0.1'
            });
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/components/movie?version=0.1',
                specs_utils_spec_1.getDefaultRequest()
            ]);
            expect(component).not.toBeNull();
            expect(component.name['en-GB']).toEqual('component1');
        });
    });
    describe('List components', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, [{
                    name: { 'en-GB': 'component1' }
                }, {
                    name: { 'en-GB': 'component2' }
                }]);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('With default options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let components = await client.components.list();
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/components?versionStatus=published',
                specs_utils_spec_1.getDefaultRequest()
            ]);
            expect(components).not.toBeNull();
            expect(components.length).toEqual(2);
            expect(components[1].name['en-GB']).toEqual('component2');
        });
        it('With specific options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let components = await client.components.list('latest');
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/components',
                specs_utils_spec_1.getDefaultRequest()
            ]);
            expect(components).not.toBeNull();
            expect(components.length).toEqual(2);
            expect(components[1].name['en-GB']).toEqual('component2');
        });
    });
});
