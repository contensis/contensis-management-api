import * as Contensis from '../index';
import { getDefaultAuthenticateUrl, getDefaultConfig, getDefaultResponse, setDefaultSpy } from '../specs-utils.spec';
import fetch from 'cross-fetch';
const Zengenti = { Contensis };
const global = window || this;
global.fetch = fetch;
describe('Role Operations', () => {
    describe('Get role', () => {
        beforeEach(() => {
            setDefaultSpy(global, {
                name: { 'en-GB': 'role1' }
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('by id', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let role = await client.roles.get('RRRRRR');
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/security/roles/RRRRRR',
                getDefaultResponse()
            ]);
            expect(role).not.toBeNull();
            expect(role.name['en-GB']).toEqual('role1');
        });
    });
    describe('List roles', () => {
        beforeEach(() => {
            setDefaultSpy(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: [{
                        name: { 'en-GB': 'role1' }
                    }, {
                        name: { 'en-GB': 'role2' }
                    }]
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('with default options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let roles = await client.roles.list();
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/security/roles?pageIndex=0&pageSize=25',
                getDefaultResponse()
            ]);
            expect(roles).not.toBeNull();
            expect(roles.items.length).toEqual(2);
            expect(roles.items[1].name['en-GB']).toEqual('role2');
        });
        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let roles = await client.roles.list({ pageIndex: 1, pageSize: 50 });
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/security/roles?pageIndex=1&pageSize=50',
                getDefaultResponse()
            ]);
            expect(roles).not.toBeNull();
            expect(roles.items.length).toEqual(2);
            expect(roles.items[1].name['en-GB']).toEqual('role2');
        });
    });
});
