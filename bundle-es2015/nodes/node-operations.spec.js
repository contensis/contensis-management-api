import * as Contensis from '../index';
import { getDefaultAuthenticateUrl, getDefaultConfig, getDefaultFetchRequest, setDefaultSpy } from '../specs-utils.spec';
import fetch from 'cross-fetch';
const Zengenti = { Contensis };
const global = window || this;
global.fetch = fetch;
describe('Nodes Operations', () => {
    describe('Get node', () => {
        beforeEach(() => {
            setDefaultSpy(global, {
                slug: { 'en-GB': 'node1' }
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('root', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let node = await client.nodes.getRoot();
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/nodes/root',
                getDefaultFetchRequest()
            ]);
            expect(node).not.toBeNull();
            expect(node.slug['en-GB']).toEqual('node1');
        });
        it('by node id', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let node = await client.nodes.get('NNNNNN');
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/nodes/NNNNNN',
                getDefaultFetchRequest()
            ]);
            expect(node).not.toBeNull();
            expect(node.slug['en-GB']).toEqual('node1');
        });
    });
    describe('Get nodes', () => {
        beforeEach(() => {
            setDefaultSpy(global, [{
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
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let nodes = await client.nodes.getByEntryId('EEEEEE');
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/nodes?entryId=EEEEEE',
                getDefaultFetchRequest()
            ]);
            expect(nodes).not.toBeNull();
            expect(nodes.length).toEqual(2);
            expect(nodes[0].slug['en-GB']).toEqual('node1');
        });
        it('for parent with default options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let nodes = await client.nodes.getChildren('PPPPPP');
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/nodes/PPPPPP/children?language=en-US',
                getDefaultFetchRequest()
            ]);
            expect(nodes).not.toBeNull();
            expect(nodes.length).toEqual(2);
            expect(nodes[0].slug['en-GB']).toEqual('node1');
        });
        it('for parent with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let nodes = await client.nodes.getChildren({
                id: 'PPPPPP',
                language: 'fr-FR'
            });
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/nodes/PPPPPP/children?language=fr-FR',
                getDefaultFetchRequest()
            ]);
            expect(nodes).not.toBeNull();
            expect(nodes.length).toEqual(2);
            expect(nodes[0].slug['en-GB']).toEqual('node1');
        });
    });
});
