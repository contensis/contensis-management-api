"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contensis = require("../index");
const specs_utils_spec_1 = require("../specs-utils.spec");
const cross_fetch_1 = require("cross-fetch");
const Zengenti = { Contensis };
const global = window || this;
global.fetch = cross_fetch_1.default;
describe('Group Operations', () => {
    describe('Get group', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, specs_utils_spec_1.defaultGroups[0]);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('by id', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let group = await client.groups.getById(specs_utils_spec_1.defaultGroups[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/security/groups/${specs_utils_spec_1.defaultGroups[0].id}`,
                specs_utils_spec_1.getDefaultResponse()
            ]);
            expect(group).not.toBeNull();
            expect(group.id).toEqual(specs_utils_spec_1.defaultGroups[0].id);
        });
        it('by name', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let group = await client.groups.getByName(specs_utils_spec_1.defaultGroups[0].name);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/security/groups/${specs_utils_spec_1.defaultGroups[0].name}`,
                specs_utils_spec_1.getDefaultResponse()
            ]);
            expect(group).not.toBeNull();
            expect(group.name).toEqual(specs_utils_spec_1.defaultGroups[0].name);
        });
    });
    describe('List groups', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: specs_utils_spec_1.defaultGroups
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('with default options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let groups = await client.groups.list();
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/security/groups',
                specs_utils_spec_1.getDefaultResponse()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(specs_utils_spec_1.defaultGroups[1].name);
        });
        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let groups = await client.groups.list({
                q: 'content',
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['name']
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/security/groups?order=name&pageIndex=1&pageSize=50&q=content',
                specs_utils_spec_1.getDefaultResponse()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(specs_utils_spec_1.defaultGroups[1].name);
        });
        it('with specific options and no query', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let groups = await client.groups.list({
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['name']
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/security/groups?order=name&pageIndex=1&pageSize=50',
                specs_utils_spec_1.getDefaultResponse()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(specs_utils_spec_1.defaultGroups[1].name);
        });
    });
});
