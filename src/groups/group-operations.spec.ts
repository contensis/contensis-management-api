import * as Contensis from '../index';
import { defaultGroups, getDefaultAuthenticateUrl, getDefaultConfig, getDefaultResponse, setDefaultSpy } from '../specs-utils.spec';
import fetch from 'cross-fetch';
import { Group } from '../models';
import { PagedList } from 'contensis-core-api';

const Zengenti = { Contensis };
const global = window || this;
global.fetch = fetch;

describe('Group Operations', () => {

    describe('Get group', () => {
        beforeEach(() => {
            setDefaultSpy(global, defaultGroups[0]);

            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });

        it('by id', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let group = await client.groups.getById(defaultGroups[0].id);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/security/groups/${defaultGroups[0].id}`,
                getDefaultResponse()
            ]);

            expect(group).not.toBeNull();
            expect(group.id).toEqual(defaultGroups[0].id);
        });

        it('by name', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let group = await client.groups.getByName(defaultGroups[0].name);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/security/groups/${defaultGroups[0].name}`,
                getDefaultResponse()
            ]);

            expect(group).not.toBeNull();
            expect(group.name).toEqual(defaultGroups[0].name);
        });
    });

    describe('List groups', () => {
        beforeEach(() => {
            setDefaultSpy(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: defaultGroups
            } as PagedList<Partial<Group>>);

            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });

        it('with default options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let groups = await client.groups.list();

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/security/groups',
                getDefaultResponse()
            ]);

            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(defaultGroups[1].name);
        });

        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let groups = await client.groups.list({
                q: 'content',
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['name']
            });

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/security/groups?order=name&pageIndex=1&pageSize=50&q=content',
                getDefaultResponse()
            ]);

            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(defaultGroups[1].name);
        });

        it('with specific options and no query', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let groups = await client.groups.list({
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['name']
            });

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/security/groups?order=name&pageIndex=1&pageSize=50',
                getDefaultResponse()
            ]);

            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(defaultGroups[1].name);
        });
    });
});
