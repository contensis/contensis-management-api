"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contensis = require("../index");
const specs_utils_spec_1 = require("../specs-utils.spec");
const cross_fetch_1 = require("cross-fetch");
const Zengenti = { Contensis };
const global = window || this;
global.fetch = cross_fetch_1.default;
describe('Tag Operations', () => {
    describe('Get tag', () => {
        const get = {
            id: 'cb588ac4-859a-4ebc-b14f-a39dee4786b0',
            value: 'car',
            label: {
                'en-GB': 'Car',
                'fr-FR': 'Voiture',
            },
            groupId: 'keywords',
            version: {
                createdBy: 'j.smith',
                created: '2024-01-22T09:30:11.2340981Z',
                modifiedBy: 'j.smith',
                modified: '2024-01-22T09:30:11.2340981Z',
                versionNo: '1.0',
            },
            usageCount: 156,
        };
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, get);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('by id', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            const tag = await client.tags.get(get.id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/tags/${get.id}?language=en-US`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(tag).not.toBeNull();
            expect(tag.id).toEqual(get.id);
        });
        it('by label', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            const tag = await client.tags.get({
                groupId: 'keywords', label: 'Car', language: 'en-GB'
            });
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/taggroups/${get.groupId}/tags?label=${get.label['en-GB']}&language=en-GB`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(tag).not.toBeNull();
            expect(tag.id).toEqual(get.id);
        });
    });
    describe('List tags', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2492,
                pageCount: 100,
                items: [
                    {
                        id: 'tree',
                        label: {
                            'en-GB': 'Tree',
                            'fr-FR': 'Arbre',
                        },
                        groupId: 'keywords',
                        version: {
                            createdBy: 'j.smith',
                            created: '2024-01-22T09:30:11.2340981Z',
                            modifiedBy: 'j.smith',
                            modified: '2024-01-22T09:30:11.2340981Z',
                            versionNo: '1.0',
                        },
                        usageCount: 156,
                    },
                ],
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('with default options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            const tags = await client.tags.list();
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/tags?language=en-US&pageIndex=0&pageSize=25',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(tags).not.toBeNull();
            expect(tags.items.length).toEqual(1);
            expect(tags.items[0].id).toEqual('tree');
        });
        it('with all options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            const tags = await client.tags.list({
                groupId: 'keywords',
                language: 'en-GB',
                q: 'tree',
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['label']
            });
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/taggroups/keywords/tags?language=en-GB&order=label&pageIndex=1&pageSize=50&q=tree`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(tags).not.toBeNull();
            expect(tags.items.length).toEqual(1);
            expect(tags.items[0].id).toEqual('tree');
        });
        it('with no group id or language', async () => {
            const client = Zengenti.Contensis.Client.create(Object.assign(Object.assign({}, (0, specs_utils_spec_1.getDefaultConfig)()), { language: undefined }));
            const tags = await client.tags.list({
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['label'],
                q: 'tree'
            });
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/tags?order=label&pageIndex=1&pageSize=50&q=tree',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(tags).not.toBeNull();
            expect(tags.items.length).toEqual(1);
            expect(tags.items[0].id).toEqual('tree');
        });
    });
    describe('Create tag', () => {
        const tag = {
            value: 'car',
            groupId: 'keywords',
            label: {
                'en-GB': 'Car',
                'fr-FR': 'Voiture',
            },
        };
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, tag);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid tag', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            const created = await client.tags.create(tag);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/tags`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)('POST', null, JSON.stringify(tag))
            ]);
            expect(created).not.toBeNull();
            expect(created.value).toEqual(tag.value);
        });
    });
    describe('Update tag', () => {
        const tag = {
            id: '1',
            value: 'car',
            groupId: 'keywords',
            label: {
                'en-GB': 'Car',
                'fr-FR': 'Voiture',
            },
        };
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, tag);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid group', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            const updated = await client.tags.update(tag);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/tags/${tag.id}`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)('PUT', null, JSON.stringify(tag))
            ]);
            expect(updated).not.toBeNull();
            expect(updated.value).toEqual(tag.value);
        });
    });
    describe('Delete tag', () => {
        const tagId = '1';
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for single tag with replacement tag id', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            const result = await client.tags.delete(tagId, '2');
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/tags/${tagId}?replacementTagId=2`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)('DELETE')
            ]);
            expect(result).toEqual(null);
        });
    });
    describe('Delete multiple tags', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, {
                success: [{
                        id: '1',
                    }],
                failed: [{
                        id: '2',
                        error: {
                            type: 'Error',
                            message: "A tag with ID '2' does not exist",
                            data: null,
                        },
                    }],
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('in tag group', async () => {
            const bulkOptions = { groupId: 'keywords', ids: ['1', '2'] };
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            const deleted = await client.tags.delete(bulkOptions);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/projects/myProject/taggroups/${bulkOptions.groupId}/tags/bulk`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)('DELETE', null, JSON.stringify(bulkOptions.ids))
            ]);
            expect(deleted).not.toBeNull();
            expect(deleted.success.length).toEqual(1);
            expect(deleted.failed.length).toEqual(1);
        });
    });
    describe('Get tag usage', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, {
                totalArchivedCount: 0,
                totalRecycleBinCount: 0,
                pageIndex: 0,
                pageSize: 3,
                totalCount: 15,
                pageCount: 5,
                items: [
                    {
                        id: '14ea7102-5de8-4a50-a2f2-7d68a09b459b',
                        language: 'en-GB',
                        title: 'Charlie and the chocolate factory',
                        description: null,
                        fieldId: 'author[0]',
                        contentTypeId: 'book',
                        dataFormat: 'entry',
                        workflowState: 'draft',
                    },
                    {
                        id: '1e2c7905-75f7-47f4-b1cb-b84129078e50',
                        language: 'en-GB',
                        title: 'The witches',
                        description: null,
                        fieldId: 'author[0]',
                        contentTypeId: 'book',
                        dataFormat: 'entry',
                        workflowState: 'versionComplete',
                    },
                    {
                        id: '1e2c7905-75f7-47f4-b1cb-b84129078e50',
                        language: 'fr-FR',
                        title: 'Les sorcières',
                        description: null,
                        fieldId: 'author[0]',
                        contentTypeId: 'book',
                        dataFormat: 'entry',
                        workflowState: 'versionComplete',
                    },
                ],
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('by id and no language', async () => {
            const client = Zengenti.Contensis.Client.create(Object.assign(Object.assign({}, (0, specs_utils_spec_1.getDefaultConfig)()), { language: undefined }));
            const usage = await client.tags.getUsage('1');
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/tags/1/usage?pageIndex=0&pageSize=25',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(usage).not.toBeNull();
            expect(usage.items.length).toEqual(3);
            expect(usage.items[1].contentTypeId).toEqual('book');
        });
        it('with all options', async () => {
            const client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            const usage = await client.tags.getUsage({
                id: '1',
                language: 'fr-FR',
                pageOptions: { pageIndex: 1, pageSize: 50 },
                q: 'witches',
                versionStatus: 'latest'
            });
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/tags/1/usage?language=fr-FR&pageIndex=1&pageSize=50&q=witches&versionStatus=latest',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(usage).not.toBeNull();
            expect(usage.items.length).toEqual(3);
            expect(usage.items[1].contentTypeId).toEqual('book');
        });
    });
});
