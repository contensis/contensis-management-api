import * as Contensis from '../index';
import { getDefaultAuthenticateUrl, getDefaultConfig, getDefaultFetchRequest, setDefaultSpy } from '../specs-utils.spec';
import fetch from 'cross-fetch';
import { Redirect } from '../models';
import { PagedList } from 'contensis-core-api';

const Zengenti = { Contensis };
const global = window || this;
global.fetch = fetch;

describe('Redirect Operations', () => {

    describe('Get redirect', () => {
        beforeEach(() => {
            setDefaultSpy(global, {
                id: 'redirect1',
                sourceDomain: 'www.example.co.uk',
                destination: 'https://www.example.com',
                statusCode: 301,
                appendSourcePathToDestination: true,
                match: {
                    type: "beginsWith",
                    value: "/"
                }
            } as Partial<Redirect>);

            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });

        it('by id', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let redirect = await client.redirects.get('myRedirectId');

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/redirects/myRedirectId',
                getDefaultFetchRequest()
            ]);

            expect(redirect).not.toBeNull();
            expect(redirect.id).toEqual('redirect1');
        });
    });

    describe('List redirects', () => {
        beforeEach(() => {
            setDefaultSpy(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: [{
                    id: 'redirect1'
                }, {
                    id: 'redirect2'
                }]
            } as PagedList<Partial<Redirect>>);

            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });

        it('with default options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let redirects = await client.redirects.list();

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/redirects?pageIndex=0&pageSize=25',
                getDefaultFetchRequest()
            ]);

            expect(redirects).not.toBeNull();
            expect(redirects.items.length).toEqual(2);
            expect(redirects.items[1].id).toEqual('redirect2');
        });

        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let redirects = await client.redirects.list({ pageIndex: 1, pageSize: 50 });

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject/redirects?pageIndex=1&pageSize=50',
                getDefaultFetchRequest()
            ]);

            expect(redirects).not.toBeNull();
            expect(redirects.items.length).toEqual(2);
            expect(redirects.items[1].id).toEqual('redirect2');
        });
    });
});
