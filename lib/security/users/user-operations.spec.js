"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Contensis = require("../../index");
const specs_utils_spec_1 = require("../../specs-utils.spec");
const cross_fetch_1 = require("cross-fetch");
const Zengenti = { Contensis };
const global = window || this;
global.fetch = cross_fetch_1.default;
describe('User Operations', () => {
    describe('Get user', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, specs_utils_spec_1.defaultUsers[0]);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('current', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let user = await client.security.users.getCurrent();
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/@current`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(user).not.toBeNull();
            expect(user.id).toEqual(specs_utils_spec_1.defaultUsers[0].id);
        });
        it('by id', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let user = await client.security.users.getById(specs_utils_spec_1.defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(user).not.toBeNull();
            expect(user.id).toEqual(specs_utils_spec_1.defaultUsers[0].id);
        });
        it('by username', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let user = await client.security.users.getByUsername(specs_utils_spec_1.defaultUsers[0].username);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].username}`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(user).not.toBeNull();
            expect(user.username).toEqual(specs_utils_spec_1.defaultUsers[0].username);
        });
        it('by email', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let user = await client.security.users.getByEmail(specs_utils_spec_1.defaultUsers[0].email);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].email}`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(user).not.toBeNull();
            expect(user.email).toEqual(specs_utils_spec_1.defaultUsers[0].email);
        });
    });
    describe('List users', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, {
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
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let users = await client.security.users.list();
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/users',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(specs_utils_spec_1.defaultUsers[1].username);
        });
        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let users = await client.security.users.list({
                q: 'content',
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['username']
            });
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/users?order=username&pageIndex=1&pageSize=50&q=content',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(specs_utils_spec_1.defaultUsers[1].username);
        });
        it('with specific options and no query', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let users = await client.security.users.list({
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['username']
            });
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/users?order=username&pageIndex=1&pageSize=50',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(specs_utils_spec_1.defaultUsers[1].username);
        });
    });
    describe('Create user', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, specs_utils_spec_1.defaultUsers[0]);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid user', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let user = await client.security.users.create(specs_utils_spec_1.defaultUsers[0]);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)('POST', null, JSON.stringify(specs_utils_spec_1.defaultUsers[0]))
            ]);
            expect(user).not.toBeNull();
            expect(user.id).toEqual(specs_utils_spec_1.defaultUsers[0].id);
        });
        it('for valid suspended user', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let user = await client.security.users.create(specs_utils_spec_1.defaultUsers[0], true);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users?suspended=true`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)('POST', null, JSON.stringify(specs_utils_spec_1.defaultUsers[0]))
            ]);
            expect(user).not.toBeNull();
            expect(user.id).toEqual(specs_utils_spec_1.defaultUsers[0].id);
        });
        it('for valid unsuspended user', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let user = await client.security.users.create(specs_utils_spec_1.defaultUsers[0], false);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)('POST', null, JSON.stringify(specs_utils_spec_1.defaultUsers[0]))
            ]);
            expect(user).not.toBeNull();
            expect(user.id).toEqual(specs_utils_spec_1.defaultUsers[0].id);
        });
    });
    describe('Update user', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, specs_utils_spec_1.defaultUsers[0]);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid user', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let user = await client.security.users.update(specs_utils_spec_1.defaultUsers[0]);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)('PATCH', null, JSON.stringify(specs_utils_spec_1.defaultUsers[0]))
            ]);
            expect(user).not.toBeNull();
            expect(user.id).toEqual(specs_utils_spec_1.defaultUsers[0].id);
        });
    });
    describe('Update user password', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid user', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let options = {
                userId: specs_utils_spec_1.defaultUsers[0].id,
                new: 'pwd1',
                existing: 'pwd2'
            };
            const { userId } = options, requestBody = tslib_1.__rest(options, ["userId"]);
            let result = await client.security.users.updatePassword(options);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/credentials/password`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)('POST', null, JSON.stringify(requestBody))
            ]);
            expect(result).toEqual(null);
        });
    });
    describe('Delete user', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid user', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let result = await client.security.users.delete(specs_utils_spec_1.defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)('DELETE')
            ]);
            expect(result).toEqual(null);
        });
    });
    describe('Is user member of group', () => {
        describe('for a positive result', () => {
            beforeEach(() => {
                (0, specs_utils_spec_1.setDefaultSpy)(global, null);
                Zengenti.Contensis.Client.defaultClientConfig = null;
                Zengenti.Contensis.Client.configure({
                    fetchFn: global.fetch
                });
            });
            it('and valid user and group', async () => {
                let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
                let result = await client.security.users.userIsMemberOf(specs_utils_spec_1.defaultUsers[0].id, specs_utils_spec_1.defaultGroups[0].id);
                expect(global.fetch).toHaveBeenCalledTimes(2);
                expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
                expect(global.fetch.calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/groups/${specs_utils_spec_1.defaultGroups[0].id}`,
                    (0, specs_utils_spec_1.getDefaultFetchRequest)('HEAD')
                ]);
                expect(result).toBeTrue();
            });
        });
        describe('for a negative result', () => {
            beforeEach(() => {
                (0, specs_utils_spec_1.setDefaultSpy)(global, null, true);
                Zengenti.Contensis.Client.defaultClientConfig = null;
                Zengenti.Contensis.Client.configure({
                    fetchFn: global.fetch
                });
            });
            it('and valid user and group', async () => {
                let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
                let result = await client.security.users.userIsMemberOf(specs_utils_spec_1.defaultUsers[0].id, specs_utils_spec_1.defaultGroups[0].id);
                expect(global.fetch).toHaveBeenCalledTimes(2);
                expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
                expect(global.fetch.calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/groups/${specs_utils_spec_1.defaultGroups[0].id}`,
                    (0, specs_utils_spec_1.getDefaultFetchRequest)('HEAD')
                ]);
                expect(result).toBeFalse();
            });
        });
    });
    describe('Is user in groups', () => {
        describe('for a positive result', () => {
            beforeEach(() => {
                (0, specs_utils_spec_1.setDefaultSpy)(global, null);
                Zengenti.Contensis.Client.defaultClientConfig = null;
                Zengenti.Contensis.Client.configure({
                    fetchFn: global.fetch
                });
            });
            it('and valid user and group', async () => {
                let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
                let result = await client.security.users.userIsMemberOf(specs_utils_spec_1.defaultUsers[0].id, specs_utils_spec_1.defaultGroups[0].id, specs_utils_spec_1.defaultGroups[1].id);
                expect(global.fetch).toHaveBeenCalledTimes(2);
                expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
                expect(global.fetch.calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/groups/${specs_utils_spec_1.defaultGroups[0].id},${specs_utils_spec_1.defaultGroups[1].id}`,
                    (0, specs_utils_spec_1.getDefaultFetchRequest)('HEAD')
                ]);
                expect(result).toBeTrue();
            });
        });
        describe('for a negative result', () => {
            beforeEach(() => {
                (0, specs_utils_spec_1.setDefaultSpy)(global, null, true);
                Zengenti.Contensis.Client.defaultClientConfig = null;
                Zengenti.Contensis.Client.configure({
                    fetchFn: global.fetch
                });
            });
            it('and valid user and group', async () => {
                let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
                let result = await client.security.users.userIsMemberOf(specs_utils_spec_1.defaultUsers[0].id, specs_utils_spec_1.defaultGroups[0].id, specs_utils_spec_1.defaultGroups[1].id);
                expect(global.fetch).toHaveBeenCalledTimes(2);
                expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
                expect(global.fetch.calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/groups/${specs_utils_spec_1.defaultGroups[0].id},${specs_utils_spec_1.defaultGroups[1].id}`,
                    (0, specs_utils_spec_1.getDefaultFetchRequest)('HEAD')
                ]);
                expect(result).toBeFalse();
            });
        });
    });
    describe('Get user groups', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, {
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
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let groups = await client.security.users.getUserGroups(specs_utils_spec_1.defaultUsers[0].id);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/groups?pageIndex=0&pageSize=25`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(specs_utils_spec_1.defaultGroups[1].name);
        });
        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let groups = await client.security.users.getUserGroups({
                userId: specs_utils_spec_1.defaultUsers[0].id,
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['name'],
                includeInherited: true
            });
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/groups?includeInherited=true&order=name&pageIndex=1&pageSize=50`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(specs_utils_spec_1.defaultGroups[1].name);
        });
    });
    describe('Perform user actions', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('suspend', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let result = await client.security.users.suspendUser(specs_utils_spec_1.defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/actions`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)('POST', false, JSON.stringify({ type: 'suspend' }))
            ]);
            expect(result).toEqual(null);
        });
        it('unsuspend', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let result = await client.security.users.unsuspendUser(specs_utils_spec_1.defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/actions`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)('POST', false, JSON.stringify({ type: 'unsuspend' }))
            ]);
            expect(result).toEqual(null);
        });
        it('unlock', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let result = await client.security.users.unlockUser(specs_utils_spec_1.defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/actions`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)('POST', false, JSON.stringify({ type: 'unlock' }))
            ]);
            expect(result).toEqual(null);
        });
    });
});
