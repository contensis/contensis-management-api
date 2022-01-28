"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contensis = require("../../index");
const specs_utils_spec_1 = require("../../specs-utils.spec");
const cross_fetch_1 = require("cross-fetch");
const Zengenti = { Contensis };
const global = window || this;
global.fetch = cross_fetch_1.default;
describe('Group Operations', () => {
    describe('Get group', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, specs_utils_spec_1.defaultGroups[0]);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('by id', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let group = await client.security.groups.getById(specs_utils_spec_1.defaultGroups[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${specs_utils_spec_1.defaultGroups[0].id}`,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(group).not.toBeNull();
            expect(group.id).toEqual(specs_utils_spec_1.defaultGroups[0].id);
        });
        it('by name', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let group = await client.security.groups.getByName(specs_utils_spec_1.defaultGroups[0].name);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${specs_utils_spec_1.defaultGroups[0].name}`,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(group).not.toBeNull();
            expect(group.name).toEqual(specs_utils_spec_1.defaultGroups[0].name);
        });
    });
    describe('List groups', () => {
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
            let groups = await client.security.groups.list();
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/groups',
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(specs_utils_spec_1.defaultGroups[1].name);
        });
        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let groups = await client.security.groups.list({
                q: 'content',
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['name']
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/groups?order=name&pageIndex=1&pageSize=50&q=content',
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(specs_utils_spec_1.defaultGroups[1].name);
        });
        it('with specific options and no query', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let groups = await client.security.groups.list({
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['name']
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/groups?order=name&pageIndex=1&pageSize=50',
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(specs_utils_spec_1.defaultGroups[1].name);
        });
    });
    describe('Create group', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, specs_utils_spec_1.defaultGroups[0]);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid group', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let group = await client.security.groups.create(specs_utils_spec_1.defaultGroups[0]);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups`,
                specs_utils_spec_1.getDefaultFetchRequest('POST', null, JSON.stringify(specs_utils_spec_1.defaultGroups[0]))
            ]);
            expect(group).not.toBeNull();
            expect(group.id).toEqual(specs_utils_spec_1.defaultGroups[0].id);
        });
    });
    describe('Update group', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, specs_utils_spec_1.defaultGroups[0]);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid group', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let group = await client.security.groups.update(specs_utils_spec_1.defaultGroups[0]);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${specs_utils_spec_1.defaultGroups[0].id}`,
                specs_utils_spec_1.getDefaultFetchRequest('PUT', null, JSON.stringify(specs_utils_spec_1.defaultGroups[0]))
            ]);
            expect(group).not.toBeNull();
            expect(group.id).toEqual(specs_utils_spec_1.defaultGroups[0].id);
        });
    });
    describe('Delete group', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid group', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let result = await client.security.groups.delete(specs_utils_spec_1.defaultGroups[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${specs_utils_spec_1.defaultGroups[0].id}`,
                specs_utils_spec_1.getDefaultFetchRequest('DELETE')
            ]);
            expect(result).toEqual(null);
        });
    });
    describe('Add user to group', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid group and user', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let result = await client.security.groups.addUser(specs_utils_spec_1.defaultGroups[0].id, specs_utils_spec_1.defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${specs_utils_spec_1.defaultGroups[0].id}/users/${specs_utils_spec_1.defaultUsers[0].id}`,
                specs_utils_spec_1.getDefaultFetchRequest('PUT')
            ]);
            expect(result).toEqual(null);
        });
    });
    describe('Add users to group', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid group and users', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            const userIds = [specs_utils_spec_1.defaultUsers[0].id, specs_utils_spec_1.defaultUsers[1].id];
            let result = await client.security.groups.addUsers(specs_utils_spec_1.defaultGroups[0].id, userIds);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${specs_utils_spec_1.defaultGroups[0].id}/users`,
                specs_utils_spec_1.getDefaultFetchRequest('POST', false, JSON.stringify(userIds))
            ]);
            expect(result).toEqual(null);
        });
    });
    describe('Remove user from group', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid group and user', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let result = await client.security.groups.removeUser(specs_utils_spec_1.defaultGroups[0].id, specs_utils_spec_1.defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${specs_utils_spec_1.defaultGroups[0].id}/users/${specs_utils_spec_1.defaultUsers[0].id}`,
                specs_utils_spec_1.getDefaultFetchRequest('DELETE')
            ]);
            expect(result).toEqual(null);
        });
    });
    describe('Has user in group', () => {
        describe('for a positive result', () => {
            beforeEach(() => {
                specs_utils_spec_1.setDefaultSpy(global, null);
                Zengenti.Contensis.Client.defaultClientConfig = null;
                Zengenti.Contensis.Client.configure({
                    fetchFn: global.fetch
                });
            });
            it('and valid group and user', async () => {
                let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
                let result = await client.security.groups.hasUser(specs_utils_spec_1.defaultGroups[0].id, specs_utils_spec_1.defaultUsers[0].id);
                expect(global.fetch).toHaveBeenCalledTimes(2);
                expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
                expect(global.fetch.calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/security/groups/${specs_utils_spec_1.defaultGroups[0].id}/users/${specs_utils_spec_1.defaultUsers[0].id}`,
                    specs_utils_spec_1.getDefaultFetchRequest('HEAD')
                ]);
                expect(result).toBeTrue();
            });
        });
        describe('for a negative result', () => {
            beforeEach(() => {
                specs_utils_spec_1.setDefaultSpy(global, null, true);
                Zengenti.Contensis.Client.defaultClientConfig = null;
                Zengenti.Contensis.Client.configure({
                    fetchFn: global.fetch
                });
            });
            it('and valid group and user', async () => {
                let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
                let result = await client.security.groups.hasUser(specs_utils_spec_1.defaultGroups[0].id, specs_utils_spec_1.defaultUsers[0].id);
                expect(global.fetch).toHaveBeenCalledTimes(2);
                expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
                expect(global.fetch.calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/security/groups/${specs_utils_spec_1.defaultGroups[0].id}/users/${specs_utils_spec_1.defaultUsers[0].id}`,
                    specs_utils_spec_1.getDefaultFetchRequest('HEAD')
                ]);
                expect(result).toBeFalse();
            });
        });
    });
    describe('Add child group to group', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid group and child group', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let result = await client.security.groups.addChildGroup(specs_utils_spec_1.defaultGroups[0].id, specs_utils_spec_1.defaultGroups[1].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${specs_utils_spec_1.defaultGroups[0].id}/groups/${specs_utils_spec_1.defaultGroups[1].id}`,
                specs_utils_spec_1.getDefaultFetchRequest('PUT')
            ]);
            expect(result).toEqual(null);
        });
    });
    describe('Remove child group from group', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, null);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('for valid group and child group', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let result = await client.security.groups.removeChildGroup(specs_utils_spec_1.defaultGroups[0].id, specs_utils_spec_1.defaultGroups[1].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${specs_utils_spec_1.defaultGroups[0].id}/groups/${specs_utils_spec_1.defaultGroups[1].id}`,
                specs_utils_spec_1.getDefaultFetchRequest('DELETE')
            ]);
            expect(result).toEqual(null);
        });
    });
    describe('Gets users in group', () => {
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
        it('by group id', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let users = await client.security.groups.getUsersByGroupId(specs_utils_spec_1.defaultGroups[0].id);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${specs_utils_spec_1.defaultGroups[0].id}/users`,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(specs_utils_spec_1.defaultUsers[1].username);
        });
        it('by group id with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let users = await client.security.groups.getUsersByGroupId(specs_utils_spec_1.defaultGroups[0].id, {
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['username']
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${specs_utils_spec_1.defaultGroups[0].id}/users?order=username&pageIndex=1&pageSize=50`,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(specs_utils_spec_1.defaultUsers[1].username);
        });
        it('by group name', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let users = await client.security.groups.getUsersByGroupName(specs_utils_spec_1.defaultGroups[0].name);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${specs_utils_spec_1.defaultGroups[0].name}/users`,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(specs_utils_spec_1.defaultUsers[1].username);
        });
        it('by group name with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let users = await client.security.groups.getUsersByGroupName(specs_utils_spec_1.defaultGroups[0].name, {
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['username']
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${specs_utils_spec_1.defaultGroups[0].name}/users?order=username&pageIndex=1&pageSize=50`,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(specs_utils_spec_1.defaultUsers[1].username);
        });
    });
    describe('Gets groups in group', () => {
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
        it('by group id', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let groups = await client.security.groups.getChildGroupsByGroupId(specs_utils_spec_1.defaultGroups[0].id);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${specs_utils_spec_1.defaultGroups[0].id}/groups`,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(specs_utils_spec_1.defaultGroups[1].name);
        });
        it('by group id with options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let groups = await client.security.groups.getChildGroupsByGroupId(specs_utils_spec_1.defaultGroups[0].id, {
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['name']
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${specs_utils_spec_1.defaultGroups[0].id}/groups?order=name&pageIndex=1&pageSize=50`,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(specs_utils_spec_1.defaultGroups[1].name);
        });
        it('by group name', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let users = await client.security.groups.getChildGroupsByGroupName(specs_utils_spec_1.defaultGroups[0].name);
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${specs_utils_spec_1.defaultGroups[0].name}/groups`,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].name).toEqual(specs_utils_spec_1.defaultGroups[1].name);
        });
        it('by group name with options', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let users = await client.security.groups.getChildGroupsByGroupName(specs_utils_spec_1.defaultGroups[0].name, {
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['name']
            });
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${specs_utils_spec_1.defaultGroups[0].name}/groups?order=name&pageIndex=1&pageSize=50`,
                specs_utils_spec_1.getDefaultFetchRequest()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].name).toEqual(specs_utils_spec_1.defaultGroups[1].name);
        });
    });
});
