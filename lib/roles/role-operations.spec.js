"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contensis = require("../index");
const specs_utils_spec_1 = require("../specs-utils.spec");
const cross_fetch_1 = require("cross-fetch");
const Zengenti = { Contensis };
const global = window || this;
global.fetch = cross_fetch_1.default;
describe('Role Operations', () => {
    describe('Get role', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, {
                name: 'role1'
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('by id', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let role = await client.roles.get('RRRRRR');
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/security/roles/RRRRRR',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(role).not.toBeNull();
            expect(role.name).toEqual('role1');
        });
    });
    describe('List roles', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: [{
                        name: 'role1'
                    }, {
                        name: 'role2'
                    }]
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('with default options', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let roles = await client.roles.list();
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/security/roles?pageIndex=0&pageSize=25',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(roles).not.toBeNull();
            expect(roles.items.length).toEqual(2);
            expect(roles.items[1].name).toEqual('role2');
        });
        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let roles = await client.roles.list({ pageIndex: 1, pageSize: 50 });
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/security/roles?pageIndex=1&pageSize=50',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(roles).not.toBeNull();
            expect(roles.items.length).toEqual(2);
            expect(roles.items[1].name).toEqual('role2');
        });
    });
});
