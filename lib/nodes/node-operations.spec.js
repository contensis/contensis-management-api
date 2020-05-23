"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contensis = require("../index");
const specs_utils_spec_1 = require("../specs-utils.spec");
const cross_fetch_1 = require("cross-fetch");
const Zengenti = { Contensis };
const global = window || this;
global.fetch = cross_fetch_1.default;
describe('Nodes Operations', () => {
    describe('Get node', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, {
                slug: { 'en-GB': 'node1' }
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('root', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let node = await client.nodes.getRoot();
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/nodes/root',
                specs_utils_spec_1.getDefaultResponse()
            ]);
            expect(node).not.toBeNull();
            expect(node.slug['en-GB']).toEqual('node1');
        });
        it('by node id', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let node = await client.nodes.get('NNNNNN');
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/nodes/NNNNNN',
                specs_utils_spec_1.getDefaultResponse()
            ]);
            expect(node).not.toBeNull();
            expect(node.slug['en-GB']).toEqual('node1');
        });
    });
    describe('Get nodes', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, [{
                    slug: { 'en-GB': 'node1' }
                },
                {
                    slug: { 'en-GB': 'node2' }
                }]);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('by entry id', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let nodes = await client.nodes.getByEntryId('EEEEEE');
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/nodes?entryId=EEEEEE',
                specs_utils_spec_1.getDefaultResponse()
            ]);
            expect(nodes).not.toBeNull();
            expect(nodes.length).toEqual(2);
            expect(nodes[0].slug['en-GB']).toEqual('node1');
        });
        it('for parent with default options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let nodes = await client.nodes.getChildren('PPPPPP');
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/nodes/PPPPPP/children?language=en-US',
                specs_utils_spec_1.getDefaultResponse()
            ]);
            expect(nodes).not.toBeNull();
            expect(nodes.length).toEqual(2);
            expect(nodes[0].slug['en-GB']).toEqual('node1');
        });
        it('for parent with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let nodes = await client.nodes.getChildren({
                id: 'PPPPPP',
                language: 'fr-FR'
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/nodes/PPPPPP/children?language=fr-FR',
                specs_utils_spec_1.getDefaultResponse()
            ]);
            expect(nodes).not.toBeNull();
            expect(nodes.length).toEqual(2);
            expect(nodes[0].slug['en-GB']).toEqual('node1');
        });
    });
});
