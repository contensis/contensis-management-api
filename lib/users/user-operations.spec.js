"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contensis = require("../index");
const specs_utils_spec_1 = require("../specs-utils.spec");
const cross_fetch_1 = require("cross-fetch");
const Zengenti = { Contensis };
const global = window || this;
global.fetch = cross_fetch_1.default;
describe('User Operations', () => {
    describe('Get user', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, specs_utils_spec_1.defaultUsers[0]);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('by id', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let user = await client.users.getById(specs_utils_spec_1.defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/security/users/${specs_utils_spec_1.defaultUsers[0].id}`,
                specs_utils_spec_1.getDefaultResponse()
            ]);
            expect(user).not.toBeNull();
            expect(user.id).toEqual(specs_utils_spec_1.defaultUsers[0].id);
        });
        it('by username', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let user = await client.users.getByUsername(specs_utils_spec_1.defaultUsers[0].username);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/security/users/${specs_utils_spec_1.defaultUsers[0].username}`,
                specs_utils_spec_1.getDefaultResponse()
            ]);
            expect(user).not.toBeNull();
            expect(user.username).toEqual(specs_utils_spec_1.defaultUsers[0].username);
        });
        it('by email', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let user = await client.users.getByEmail(specs_utils_spec_1.defaultUsers[0].email);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/security/users/${specs_utils_spec_1.defaultUsers[0].email}`,
                specs_utils_spec_1.getDefaultResponse()
            ]);
            expect(user).not.toBeNull();
            expect(user.email).toEqual(specs_utils_spec_1.defaultUsers[0].email);
        });
    });
    describe('Get user groups', () => {
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
            let groups = await client.users.getGroups(specs_utils_spec_1.defaultUsers[0].id);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/security/users/${specs_utils_spec_1.defaultUsers[0].id}/groups`,
                specs_utils_spec_1.getDefaultResponse()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(specs_utils_spec_1.defaultGroups[1].name);
        });
        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let groups = await client.users.getGroups({
                userId: specs_utils_spec_1.defaultUsers[0].id,
                includeInherited: true
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/security/users/${specs_utils_spec_1.defaultUsers[0].id}/groups?includeInherited=true`,
                specs_utils_spec_1.getDefaultResponse()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(specs_utils_spec_1.defaultGroups[1].name);
        });
    });
    describe('List users', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: specs_utils_spec_1.defaultUsers
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('with default options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let users = await client.users.list();
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/security/users',
                specs_utils_spec_1.getDefaultResponse()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(specs_utils_spec_1.defaultUsers[1].username);
        });
        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let users = await client.users.list({
                q: 'content',
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['username']
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/security/users?order=username&pageIndex=1&pageSize=50&q=content',
                specs_utils_spec_1.getDefaultResponse()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(specs_utils_spec_1.defaultUsers[1].username);
        });
        it('with specific options and no query', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let users = await client.users.list({
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['username']
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/security/users?order=username&pageIndex=1&pageSize=50',
                specs_utils_spec_1.getDefaultResponse()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(specs_utils_spec_1.defaultUsers[1].username);
        });
    });
});
