import * as Contensis from '../../index';
import { defaultUsers, getDefaultAuthenticateUrl, getDefaultConfig, getDefaultFetchRequest, setDefaultSpy, defaultGroups } from '../../specs-utils.spec';
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
        it('current', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let user = await client.security.users.getCurrent();
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/@current`,
                getDefaultFetchRequest()
            ]);
            expect(user).not.toBeNull();
            expect(user.id).toEqual(defaultUsers[0].id);
            expect(user.optOutOfNotifications).toBeTrue();
        });
        it('by id', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let user = await client.security.users.getById(defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}`,
                getDefaultFetchRequest()
            ]);
            expect(user).not.toBeNull();
            expect(user.id).toEqual(defaultUsers[0].id);
        });
        it('by classic id', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let user = await client.security.users.getById(defaultUsers[0].id, true);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}?classicUserId=true`,
                getDefaultFetchRequest()
            ]);
            expect(user).not.toBeNull();
            expect(user.id).toEqual(defaultUsers[0].id);
        });
        it('by username', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let user = await client.security.users.getByUsername(defaultUsers[0].username);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].username}`,
                getDefaultFetchRequest()
            ]);
            expect(user).not.toBeNull();
            expect(user.username).toEqual(defaultUsers[0].username);
        });
        it('by email', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let user = await client.security.users.getByEmail(defaultUsers[0].email);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].email}`,
                getDefaultFetchRequest()
            ]);
            expect(user).not.toBeNull();
            expect(user.email).toEqual(defaultUsers[0].email);
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
            let users = await client.security.users.list();
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/users',
                getDefaultFetchRequest()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(defaultUsers[1].username);
        });
        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let users = await client.security.users.list({
                q: 'content',
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['username']
            });
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/users?order=username&pageIndex=1&pageSize=50&q=content',
                getDefaultFetchRequest()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(defaultUsers[1].username);
        });
        it('with specific options and no query', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let users = await client.security.users.list({
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['username']
            });
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/users?order=username&pageIndex=1&pageSize=50',
                getDefaultFetchRequest()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(defaultUsers[1].username);
        });
        it('with zenQL', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let users = await client.security.users.list({
                zenQL: 'username="Geoff"'
            });
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/users?pageIndex=0&pageSize=25&zenQL=username%3D%22Geoff%22',
                getDefaultFetchRequest()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(defaultUsers[1].username);
        });
    });
    describe('Create user', () => {
        beforeEach(() => {
            setDefaultSpy(global, defaultUsers[0]);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid user', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let user = await client.security.users.create(defaultUsers[0]);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users`,
                getDefaultFetchRequest('POST', null, JSON.stringify(defaultUsers[0]))
            ]);
            expect(user).not.toBeNull();
            expect(user.id).toEqual(defaultUsers[0].id);
        });
        it('for valid suspended user', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let user = await client.security.users.create(defaultUsers[0], true);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users?suspended=true`,
                getDefaultFetchRequest('POST', null, JSON.stringify(defaultUsers[0]))
            ]);
            expect(user).not.toBeNull();
            expect(user.id).toEqual(defaultUsers[0].id);
        });
        it('for valid unsuspended user', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let user = await client.security.users.create(defaultUsers[0], false);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users`,
                getDefaultFetchRequest('POST', null, JSON.stringify(defaultUsers[0]))
            ]);
            expect(user).not.toBeNull();
            expect(user.id).toEqual(defaultUsers[0].id);
        });
    });
    describe('Update user', () => {
        beforeEach(() => {
            setDefaultSpy(global, defaultUsers[0]);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid user', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let user = await client.security.users.update(defaultUsers[0]);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}`,
                getDefaultFetchRequest('PATCH', null, JSON.stringify(defaultUsers[0]))
            ]);
            expect(user).not.toBeNull();
            expect(user.id).toEqual(defaultUsers[0].id);
        });
    });
    describe('Update user password', () => {
        beforeEach(() => {
            setDefaultSpy(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid user', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let options = {
                userId: defaultUsers[0].id,
                new: 'pwd1',
                existing: 'pwd2'
            };
            const { userId, ...requestBody } = options;
            let result = await client.security.users.updatePassword(options);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}/credentials/password`,
                getDefaultFetchRequest('POST', null, JSON.stringify(requestBody))
            ]);
            expect(result).toEqual(null);
        });
    });
    describe('Delete user', () => {
        beforeEach(() => {
            setDefaultSpy(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid user', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let result = await client.security.users.delete(defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}`,
                getDefaultFetchRequest('DELETE')
            ]);
            expect(result).toEqual(null);
        });
    });
    describe('Is user member of group', () => {
        describe('for a positive result', () => {
            beforeEach(() => {
                setDefaultSpy(global, null);
                Zengenti.Contensis.Client.defaultClientConfig = null;
                Zengenti.Contensis.Client.configure({
                    fetchFn: global.fetch
                });
            });
            it('and valid user and group', async () => {
                let client = Zengenti.Contensis.Client.create(getDefaultConfig());
                let result = await client.security.users.userIsMemberOf(defaultUsers[0].id, defaultGroups[0].id);
                expect(global.fetch).toHaveBeenCalledTimes(2);
                expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
                expect(global.fetch.calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/security/users/${defaultUsers[0].id}/groups/${defaultGroups[0].id}`,
                    getDefaultFetchRequest('HEAD')
                ]);
                expect(result).toBeTrue();
            });
        });
        describe('for a negative result', () => {
            beforeEach(() => {
                setDefaultSpy(global, null, true);
                Zengenti.Contensis.Client.defaultClientConfig = null;
                Zengenti.Contensis.Client.configure({
                    fetchFn: global.fetch
                });
            });
            it('and valid user and group', async () => {
                let client = Zengenti.Contensis.Client.create(getDefaultConfig());
                let result = await client.security.users.userIsMemberOf(defaultUsers[0].id, defaultGroups[0].id);
                expect(global.fetch).toHaveBeenCalledTimes(2);
                expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
                expect(global.fetch.calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/security/users/${defaultUsers[0].id}/groups/${defaultGroups[0].id}`,
                    getDefaultFetchRequest('HEAD')
                ]);
                expect(result).toBeFalse();
            });
        });
    });
    describe('Is user in groups', () => {
        describe('for a positive result', () => {
            beforeEach(() => {
                setDefaultSpy(global, null);
                Zengenti.Contensis.Client.defaultClientConfig = null;
                Zengenti.Contensis.Client.configure({
                    fetchFn: global.fetch
                });
            });
            it('and valid user and group', async () => {
                let client = Zengenti.Contensis.Client.create(getDefaultConfig());
                let result = await client.security.users.userIsMemberOf(defaultUsers[0].id, defaultGroups[0].id, defaultGroups[1].id);
                expect(global.fetch).toHaveBeenCalledTimes(2);
                expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
                expect(global.fetch.calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/security/users/${defaultUsers[0].id}/groups/${defaultGroups[0].id},${defaultGroups[1].id}`,
                    getDefaultFetchRequest('HEAD')
                ]);
                expect(result).toBeTrue();
            });
        });
        describe('for a negative result', () => {
            beforeEach(() => {
                setDefaultSpy(global, null, true);
                Zengenti.Contensis.Client.defaultClientConfig = null;
                Zengenti.Contensis.Client.configure({
                    fetchFn: global.fetch
                });
            });
            it('and valid user and group', async () => {
                let client = Zengenti.Contensis.Client.create(getDefaultConfig());
                let result = await client.security.users.userIsMemberOf(defaultUsers[0].id, defaultGroups[0].id, defaultGroups[1].id);
                expect(global.fetch).toHaveBeenCalledTimes(2);
                expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
                expect(global.fetch.calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/security/users/${defaultUsers[0].id}/groups/${defaultGroups[0].id},${defaultGroups[1].id}`,
                    getDefaultFetchRequest('HEAD')
                ]);
                expect(result).toBeFalse();
            });
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
            let groups = await client.security.users.getUserGroups(defaultUsers[0].id);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}/groups?pageIndex=0&pageSize=25`,
                getDefaultFetchRequest()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(defaultGroups[1].name);
        });
        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let groups = await client.security.users.getUserGroups({
                userId: defaultUsers[0].id,
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['name'],
                includeInherited: true
            });
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}/groups?includeInherited=true&order=name&pageIndex=1&pageSize=50`,
                getDefaultFetchRequest()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(defaultGroups[1].name);
        });
    });
    describe('Perform user actions', () => {
        beforeEach(() => {
            setDefaultSpy(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('suspend', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let result = await client.security.users.suspendUser(defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}/actions`,
                getDefaultFetchRequest('POST', false, JSON.stringify({ type: 'suspend' }))
            ]);
            expect(result).toEqual(null);
        });
        it('unsuspend', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let result = await client.security.users.unsuspendUser(defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}/actions`,
                getDefaultFetchRequest('POST', false, JSON.stringify({ type: 'unsuspend' }))
            ]);
            expect(result).toEqual(null);
        });
        it('unlock', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let result = await client.security.users.unlockUser(defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}/actions`,
                getDefaultFetchRequest('POST', false, JSON.stringify({ type: 'unlock' }))
            ]);
            expect(result).toEqual(null);
        });
    });
});
