import * as Contensis from '../index';
import { defaultUsers, getDefaultAuthenticateUrl, getDefaultConfig, getDefaultResponse, setDefaultSpy, defaultGroups } from '../specs-utils.spec';
import fetch from 'cross-fetch';
const Zengenti = { Contensis };
const global = window || this;
global.fetch = fetch;
describe('User Operations', () => {
    describe('Get user', () => {
        beforeEach(() => {
            setDefaultSpy(global, defaultUsers[0]);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('by id', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let user = await client.users.getById(defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/security/users/${defaultUsers[0].id}`,
                getDefaultResponse()
            ]);
            expect(user).not.toBeNull();
            expect(user.id).toEqual(defaultUsers[0].id);
        });
        it('by username', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let user = await client.users.getByUsername(defaultUsers[0].username);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/security/users/${defaultUsers[0].username}`,
                getDefaultResponse()
            ]);
            expect(user).not.toBeNull();
            expect(user.username).toEqual(defaultUsers[0].username);
        });
        it('by email', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let user = await client.users.getByEmail(defaultUsers[0].email);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/security/users/${defaultUsers[0].email}`,
                getDefaultResponse()
            ]);
            expect(user).not.toBeNull();
            expect(user.email).toEqual(defaultUsers[0].email);
        });
    });
    describe('Get user groups', () => {
        beforeEach(() => {
            setDefaultSpy(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: defaultGroups
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('with default options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let groups = await client.users.getGroups(defaultUsers[0].id);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/security/users/${defaultUsers[0].id}/groups`,
                getDefaultResponse()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(defaultGroups[1].name);
        });
        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let groups = await client.users.getGroups({
                userId: defaultUsers[0].id,
                includeInherited: true
            });
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/security/users/${defaultUsers[0].id}/groups?includeInherited=true`,
                getDefaultResponse()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(defaultGroups[1].name);
        });
    });
    describe('List users', () => {
        beforeEach(() => {
            setDefaultSpy(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: defaultUsers
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('with default options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let users = await client.users.list();
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/security/users',
                getDefaultResponse()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(defaultUsers[1].username);
        });
        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let users = await client.users.list({
                q: 'content',
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['username']
            });
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/security/users?order=username&pageIndex=1&pageSize=50&q=content',
                getDefaultResponse()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(defaultUsers[1].username);
        });
        it('with specific options and no query', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let users = await client.users.list({
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['username']
            });
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/security/users?order=username&pageIndex=1&pageSize=50',
                getDefaultResponse()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(defaultUsers[1].username);
        });
    });
});
