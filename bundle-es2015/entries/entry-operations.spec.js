import * as Contensis from '../index';
import { getDefaultAuthenticateUrl, getDefaultConfig, getDefaultResponse, setDefaultSpy } from '../specs-utils.spec';
// import { toQuery } from 'contensis-core-api';
import fetch from 'cross-fetch';
const Zengenti = { Contensis };
const global = window || this;
global.fetch = fetch;
describe('Entry Operations', () => {
    describe('Get entry', () => {
        beforeEach(() => {
            setDefaultSpy(global, {
                title: 'Entry1'
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('by id', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let entry = await client.entries.get('1');
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/entries/1?language=en-US&versionStatus=published',
                getDefaultResponse()
            ]);
            expect(entry).not.toBeNull();
            expect(entry['title']).toEqual('Entry1');
        });
        it('with options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let entry = await client.entries.get({
                id: '1',
                versionStatus: 'latest',
                version: '2.1',
                language: 'en-GB'
            });
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/entries/1?language=en-GB&version=2.1',
                getDefaultResponse()
            ]);
            expect(entry).not.toBeNull();
            expect(entry['title']).toEqual('Entry1');
        });
    });
    describe('List entries', () => {
        beforeEach(() => {
            setDefaultSpy(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: [{
                        title: 'entry1'
                    },
                    {
                        title: 'entry2'
                    }
                ]
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('with no content type and default options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let entries = await client.entries.list();
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/entries?language=en-US&pageIndex=0&pageSize=25&versionStatus=published',
                getDefaultResponse()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
        it('with no content type and specific options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let entries = await client.entries.list({
                versionStatus: 'latest',
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['title'],
                language: 'fr-FR',
            });
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/entries?language=fr-FR&order=title&pageIndex=1&pageSize=50',
                getDefaultResponse()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
        it('with content type and default options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let entries = await client.entries.list('movie');
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/contenttypes/movie/entries?language=en-US&pageIndex=0&pageSize=25&versionStatus=published',
                getDefaultResponse()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
        it('with content type and specific options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let entries = await client.entries.list({
                contentTypeId: 'movie',
                versionStatus: 'latest',
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['title'],
                language: 'fr-FR',
            });
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/contenttypes/movie/entries?language=fr-FR&order=title&pageIndex=1&pageSize=50',
                getDefaultResponse()
            ]);
            expect(entries).not.toBeNull();
            expect(entries.items.length).toEqual(2);
            expect(entries.items[1].title).toEqual('entry2');
        });
    });
});
