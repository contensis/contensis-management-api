import * as Contensis from '../index';
import { getDefaultAuthenticateUrl, getDefaultConfig, getDefaultFetchRequest, setDefaultSpy } from '../specs-utils.spec';
import fetch from 'cross-fetch';
import { Role } from '../models';
import { PagedList } from 'contensis-core-api';

const Zengenti = { Contensis };
const global = window || this;
global.fetch = fetch;

describe('Role Operations', () => {

    describe('Get role', () => {
        beforeEach(() => {
            setDefaultSpy(global, {
                name: { 'en-GB': 'role1' }
            } as Partial<Role>);

            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });

        it('by id', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let role = await client.roles.get('RRRRRR');

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/security/roles/RRRRRR',
                getDefaultFetchRequest()
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
            } as PagedList<Partial<Role>>);

            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });

        it('with default options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let roles = await client.roles.list();

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/security/roles?pageIndex=0&pageSize=25',
                getDefaultFetchRequest()
            ]);

            expect(roles).not.toBeNull();
            expect(roles.items.length).toEqual(2);
            expect(roles.items[1].name['en-GB']).toEqual('role2');
        });

        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let roles = await client.roles.list({pageIndex: 1, pageSize: 50});

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/security/roles?pageIndex=1&pageSize=50',
                getDefaultFetchRequest()
            ]);

            expect(roles).not.toBeNull();
            expect(roles.items.length).toEqual(2);
            expect(roles.items[1].name['en-GB']).toEqual('role2');
        });
    });
});
