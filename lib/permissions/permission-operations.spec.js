"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contensis = require("../index");
const specs_utils_spec_1 = require("../specs-utils.spec");
const cross_fetch_1 = require("cross-fetch");
const Zengenti = { Contensis };
const global = window || this;
global.fetch = cross_fetch_1.default;
describe('Permission Operations', () => {
    describe('Get permissions', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, {
                actions: ['action1']
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for resource id', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let options = {
                resourceId: 'RRRRRR',
                resourceType: 'entries',
                language: 'en-GB',
                userId: 'UUUUUU'
            };
            let permissions = await client.permissions.getPermissions(options);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/security/permissions/entries/RRRRRR?language=en-GB&userId=UUUUUU',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(permissions).not.toBeNull();
            expect(permissions.actions).not.toBeNull();
            expect(permissions.actions.length).toEqual(1);
            expect(permissions.actions[0]).toEqual('action1');
        });
        it('for resource type', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let options = {
                resourceType: 'entries',
                language: 'en-GB',
                userId: 'UUUUUU'
            };
            let permissions = await client.permissions.getPermissions(options);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/security/permissions/entries?language=en-GB&userId=UUUUUU',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(permissions).not.toBeNull();
            expect(permissions.actions).not.toBeNull();
            expect(permissions.actions.length).toEqual(1);
            expect(permissions.actions[0]).toEqual('action1');
        });
    });
    describe('Get authorization for action', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, {
                authorized: true
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for resource id', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let options = {
                resourceId: 'RRRRRR',
                resourceType: 'entries',
                language: 'en-GB',
                actionName: 'sys.create',
                userId: 'UUUUUU'
            };
            let authorization = await client.permissions.getAuthorizationForAction(options);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/security/permissions/entries/RRRRRR/actions/sys.create?language=en-GB&userId=UUUUUU',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(authorization).not.toBeNull();
            expect(authorization.authorized).toBeTrue();
        });
        it('for resource type', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let options = {
                resourceType: 'entries',
                language: 'en-GB',
                actionName: 'sys.create',
                userId: 'UUUUUU'
            };
            let authorization = await client.permissions.getAuthorizationForAction(options);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/security/permissions/entries/actions/sys.create?language=en-GB&userId=UUUUUU',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(authorization).not.toBeNull();
            expect(authorization.authorized).toBeTrue();
        });
    });
});
