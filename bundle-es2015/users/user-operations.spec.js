import * as Contensis from '../index';
import { defaultUsers, getDefaultAuthenticateUrl, getDefaultConfig, getDefaultRequest, setDefaultSpy, defaultGroups } from '../specs-utils.spec';
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
                getDefaultRequest()
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
                getDefaultRequest()
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
                getDefaultRequest()
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
            let users = await client.users.list();
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/security/users',
                getDefaultRequest()
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
                getDefaultRequest()
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
                getDefaultRequest()
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
            let user = await client.users.create(defaultUsers[0]);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/security/users`,
                getDefaultRequest('POST', null, JSON.stringify(defaultUsers[0]))
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
            let user = await client.users.update(defaultUsers[0]);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/security/users/${defaultUsers[0].id}`,
                getDefaultRequest('PUT', null, JSON.stringify(defaultUsers[0]))
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
            let result = await client.users.updatePassword(options);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/security/users/${defaultUsers[0].id}/credentials/password`,
                getDefaultRequest('POST', null, JSON.stringify(requestBody))
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
            let result = await client.users.delete(defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/security/users/${defaultUsers[0].id}`,
                getDefaultRequest('DELETE')
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
                let result = await client.users.userIsMemberOf(defaultUsers[0].id, defaultGroups[0].id);
                expect(global.fetch).toHaveBeenCalledTimes(2);
                expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
                expect(global.fetch.calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/management/security/users/${defaultUsers[0].id}/groups/${defaultGroups[0].id}`,
                    getDefaultRequest('HEAD')
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
                let result = await client.users.userIsMemberOf(defaultUsers[0].id, defaultGroups[0].id);
                expect(global.fetch).toHaveBeenCalledTimes(2);
                expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
                expect(global.fetch.calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/management/security/users/${defaultUsers[0].id}/groups/${defaultGroups[0].id}`,
                    getDefaultRequest('HEAD')
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
                let result = await client.users.userIsMemberOf(defaultUsers[0].id, defaultGroups[0].id, defaultGroups[1].id);
                expect(global.fetch).toHaveBeenCalledTimes(2);
                expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
                expect(global.fetch.calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/management/security/users/${defaultUsers[0].id}/groups/${defaultGroups[0].id},${defaultGroups[1].id}`,
                    getDefaultRequest('HEAD')
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
                let result = await client.users.userIsMemberOf(defaultUsers[0].id, defaultGroups[0].id, defaultGroups[1].id);
                expect(global.fetch).toHaveBeenCalledTimes(2);
                expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
                expect(global.fetch.calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/management/security/users/${defaultUsers[0].id}/groups/${defaultGroups[0].id},${defaultGroups[1].id}`,
                    getDefaultRequest('HEAD')
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
            let groups = await client.users.getUserGroups(defaultUsers[0].id);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/security/users/${defaultUsers[0].id}/groups`,
                getDefaultRequest()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(defaultGroups[1].name);
        });
        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let groups = await client.users.getUserGroups({
                userId: defaultUsers[0].id,
                includeInherited: true
            });
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/management/security/users/${defaultUsers[0].id}/groups?includeInherited=true`,
                getDefaultRequest()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(defaultGroups[1].name);
        });
    });
});
