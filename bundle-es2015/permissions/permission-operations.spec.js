import * as Contensis from '../index';
import { getDefaultAuthenticateUrl, getDefaultConfig, getDefaultFetchRequest, setDefaultSpy } from '../specs-utils.spec';
import fetch from 'cross-fetch';
const Zengenti = { Contensis };
const global = window || this;
global.fetch = fetch;
describe('Permission Operations', () => {
    describe('Get permissions', () => {
        beforeEach(() => {
            setDefaultSpy(global, {
                actions: ['action1']
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for resource id', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let options = {
                resourceId: 'RRRRRR',
                resourceType: 'entries',
                language: 'en-GB',
                userId: 'UUUUUU'
            };
            let permissions = await client.permissions.getPermissions(options);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/security/permissions/entries/RRRRRR?language=en-GB&userId=UUUUUU',
                getDefaultFetchRequest()
            ]);
            expect(permissions).not.toBeNull();
            expect(permissions.actions).not.toBeNull();
            expect(permissions.actions.length).toEqual(1);
            expect(permissions.actions[0]).toEqual('action1');
        });
        it('for resource type', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let options = {
                resourceType: 'entries',
                language: 'en-GB',
                userId: 'UUUUUU'
            };
            let permissions = await client.permissions.getPermissions(options);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/security/permissions/entries?language=en-GB&userId=UUUUUU',
                getDefaultFetchRequest()
            ]);
            expect(permissions).not.toBeNull();
            expect(permissions.actions).not.toBeNull();
            expect(permissions.actions.length).toEqual(1);
            expect(permissions.actions[0]).toEqual('action1');
        });
    });
    describe('Get authorization for action', () => {
        beforeEach(() => {
            setDefaultSpy(global, {
                authorized: true
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for resource id', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let options = {
                resourceId: 'RRRRRR',
                resourceType: 'entries',
                language: 'en-GB',
                actionName: 'sys.create',
                userId: 'UUUUUU'
            };
            let authorization = await client.permissions.getAuthorizationForAction(options);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/security/permissions/entries/RRRRRR/actions/sys.create?language=en-GB&userId=UUUUUU',
                getDefaultFetchRequest()
            ]);
            expect(authorization).not.toBeNull();
            expect(authorization.authorized).toBeTrue();
        });
        it('for resource type', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let options = {
                resourceType: 'entries',
                language: 'en-GB',
                actionName: 'sys.create',
                userId: 'UUUUUU'
            };
            let authorization = await client.permissions.getAuthorizationForAction(options);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/security/permissions/entries/actions/sys.create?language=en-GB&userId=UUUUUU',
                getDefaultFetchRequest()
            ]);
            expect(authorization).not.toBeNull();
            expect(authorization.authorized).toBeTrue();
        });
    });
});
