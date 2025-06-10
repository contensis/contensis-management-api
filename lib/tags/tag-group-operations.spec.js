"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contensis = require("../index");
const specs_utils_spec_1 = require("../specs-utils.spec");
const cross_fetch_1 = require("cross-fetch");
const Zengenti = { Contensis };
const global = window || this;
global.fetch = cross_fetch_1.default;
describe('Tag Group Operations', () => {
    describe('Get tag group', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, {
                id: "imageTags",
                name: "Image Tags",
                description: "Image tags for use in the main asset gallery",
                version: {
                    createdBy: "j.smith",
                    created: "2024-01-21T10:40:13.2340981Z",
                    modifiedBy: "s.horan",
                    modified: "2024-01-22T14:30:45.1234567Z",
                    versionNo: "1.0"
                },
                tagCount: 12
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('by id', async () => {
            const groupId = 'imageTags';
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            const group = await client.tags.groups.get(groupId);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/taggroups/${groupId}`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(group).not.toBeNull();
            expect(group.id).toEqual(groupId);
        });
    });
    describe('List tag groups', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, {
                pageCount: 1,
                pageIndex: 0,
                pageSize: 25,
                totalCount: 1,
                items: [{
                        id: "imageTags",
                        name: "Image Tags",
                        description: "Image tags for use in the main asset gallery",
                        version: {
                            createdBy: "j.smith",
                            created: "2024-01-21T10:40:13.2340981Z",
                            modifiedBy: "s.horan",
                            modified: "2024-01-22T14:30:45.1234567Z",
                            versionNo: "1.0"
                        },
                        tagCount: 12
                    }]
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('with default options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            const groups = await client.tags.groups.list();
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/taggroups?language=en-US&pageIndex=0&pageSize=25',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(1);
            expect(groups.items[0].name).toEqual('Image Tags');
        });
        it('with all options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            const groups = await client.tags.groups.list({
                language: 'en-GB',
                q: 'image',
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['name']
            });
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/taggroups?language=en-GB&order=name&pageIndex=1&pageSize=50&q=image',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(1);
            expect(groups.items[0].name).toEqual('Image Tags');
        });
        it('with specific options and no language or query', async () => {
            const client = Zengenti.Contensis.Client.create(Object.assign(Object.assign({}, (0, specs_utils_spec_1.getDefaultConfig)()), { language: undefined }));
            const groups = await client.tags.groups.list({
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['name']
            });
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/taggroups?order=name&pageIndex=1&pageSize=50',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(1);
            expect(groups.items[0].name).toEqual('Image Tags');
        });
    });
    describe('Create tag group', () => {
        const group = {
            id: "imageTags",
            name: "Image Tags",
            description: "Image tags for use in the main asset gallery"
        };
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, group);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid group', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            const created = await client.tags.groups.create(group);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/taggroups`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)('POST', null, JSON.stringify(group))
            ]);
            expect(created).not.toBeNull();
            expect(created.id).toEqual(group.id);
        });
    });
    describe('Update tag group', () => {
        const group = {
            id: "imageTags",
            name: "Image Tags",
            description: "Image tags for use in the main asset gallery"
        };
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, group);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid group', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            const updated = await client.tags.groups.update(group);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/taggroups/${group.id}`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)('PUT', null, JSON.stringify(group))
            ]);
            expect(updated).not.toBeNull();
            expect(updated.id).toEqual(group.id);
        });
    });
    describe('Delete tag group', () => {
        const groupId = 'imageTags';
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid group', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            const result = await client.tags.groups.delete(groupId);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/taggroups/${groupId}`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)('DELETE')
            ]);
            expect(result).toEqual(null);
        });
    });
    describe('Get tag group usage', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, {
                pageCount: 1,
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: [{
                        name: {
                            'en-GB': 'Book content type',
                        },
                        description: null,
                        fieldId: 'keywords',
                        id: 'book',
                        dataFormat: 'entry',
                    }, {
                        name: {
                            'en-GB': 'Image',
                        },
                        description: null,
                        fieldId: 'keywords',
                        id: 'image',
                        dataFormat: 'asset',
                    }]
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('by id', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            const usage = await client.tags.groups.getUsage('1');
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/taggroups/1/usage?pageIndex=0&pageSize=25',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(usage).not.toBeNull();
            expect(usage.items.length).toEqual(2);
            expect(usage.items[1].id).toEqual('image');
        });
        it('with all options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            const usage = await client.tags.groups.getUsage({
                id: '1',
                pageOptions: { pageIndex: 1, pageSize: 50 },
            });
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/taggroups/1/usage?pageIndex=1&pageSize=50',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(usage).not.toBeNull();
            expect(usage.items.length).toEqual(2);
            expect(usage.items[1].id).toEqual('image');
        });
    });
});
