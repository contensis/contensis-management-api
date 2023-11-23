import * as Contensis from '../../index';
import { defaultGroups, getDefaultAuthenticateUrl, getDefaultConfig, getDefaultFetchRequest, setDefaultSpy, defaultUsers } from '../../specs-utils.spec';
import fetch from 'cross-fetch';
import { Group, User } from '../../models';
import { PagedList } from 'contensis-core-api';

const Zengenti = { Contensis };
const global = window || this;
global.fetch = fetch;

describe('Group Operations', () => {

    describe('Get group', () => {
        beforeEach(() => {
            setDefaultSpy(global, defaultGroups[0]);

            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });

        it('by id', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let group = await client.security.groups.getById(defaultGroups[0].id);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].id}`,
                getDefaultFetchRequest()
            ]);

            expect(group).not.toBeNull();
            expect(group.id).toEqual(defaultGroups[0].id);
        });

        it('by name', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let group = await client.security.groups.getByName(defaultGroups[0].name);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].name}`,
                getDefaultFetchRequest()
            ]);

            expect(group).not.toBeNull();
            expect(group.name).toEqual(defaultGroups[0].name);
        });
    });

    describe('List groups', () => {
        beforeEach(() => {
            setDefaultSpy(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: defaultGroups
            } as PagedList<Partial<Group>>);

            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });

        it('with default options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let groups = await client.security.groups.list();

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/groups',
                getDefaultFetchRequest()
            ]);

            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(defaultGroups[1].name);
        });

        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let groups = await client.security.groups.list({
                q: 'content',
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['name']
            });

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/groups?order=name&pageIndex=1&pageSize=50&q=content',
                getDefaultFetchRequest()
            ]);

            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(defaultGroups[1].name);
        });

        it('with specific options and no query', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let groups = await client.security.groups.list({
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['name']
            });

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/groups?order=name&pageIndex=1&pageSize=50',
                getDefaultFetchRequest()
            ]);

            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(defaultGroups[1].name);
        });

        it('with zenQL', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let groups = await client.security.groups.list({
                zenQL: 'name="test"',
            });

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/groups?pageIndex=0&pageSize=25&zenQL=name%3D%22test%22',
                getDefaultFetchRequest()
            ]);

            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(defaultGroups[1].name);
        });
    });

    describe('Create group', () => {
        beforeEach(() => {
            setDefaultSpy(global, defaultGroups[0]);

            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });

        it('for valid group', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let group = await client.security.groups.create(defaultGroups[0] as Group);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups`,
                getDefaultFetchRequest('POST', null, JSON.stringify(defaultGroups[0]))
            ]);

            expect(group).not.toBeNull();
            expect(group.id).toEqual(defaultGroups[0].id);
        });

    });

    describe('Update group', () => {
        beforeEach(() => {
            setDefaultSpy(global, defaultGroups[0]);

            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });

        it('for valid group', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let group = await client.security.groups.update(defaultGroups[0] as Group);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].id}`,
                getDefaultFetchRequest('PUT', null, JSON.stringify(defaultGroups[0]))
            ]);

            expect(group).not.toBeNull();
            expect(group.id).toEqual(defaultGroups[0].id);
        });

    });

    describe('Delete group', () => {
        beforeEach(() => {
            setDefaultSpy(global, null);

            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });

        it('for valid group', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let result = await client.security.groups.delete(defaultGroups[0].id);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].id}`,
                getDefaultFetchRequest('DELETE')
            ]);

            expect(result).toEqual(null);
        });

    });

    describe('Add user to group', () => {
        beforeEach(() => {
            setDefaultSpy(global, null);

            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });

        it('for valid group and user', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let result = await client.security.groups.addUser(defaultGroups[0].id, defaultUsers[0].id);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].id}/users/${defaultUsers[0].id}`,
                getDefaultFetchRequest('PUT')
            ]);

            expect(result).toEqual(null);
        });

    });

    describe('Add users to group', () => {
        beforeEach(() => {
            setDefaultSpy(global, null);

            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });

        it('for valid group and users', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            const userIds = [defaultUsers[0].id, defaultUsers[1].id];
            let result = await client.security.groups.addUsers(defaultGroups[0].id, userIds);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].id}/users`,
                getDefaultFetchRequest('POST', false, JSON.stringify(userIds))
            ]);

            expect(result).toEqual(null);
        });

    });

    describe('Remove user from group', () => {
        beforeEach(() => {
            setDefaultSpy(global, null);

            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });

        it('for valid group and user', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let result = await client.security.groups.removeUser(defaultGroups[0].id, defaultUsers[0].id);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].id}/users/${defaultUsers[0].id}`,
                getDefaultFetchRequest('DELETE')
            ]);

            expect(result).toEqual(null);
        });

    });

    describe('Has user in group', () => {

        describe('for a positive result', () => {
            beforeEach(() => {
                setDefaultSpy(global, null);

                Zengenti.Contensis.Client.defaultClientConfig = null;
                Zengenti.Contensis.Client.configure({
                    fetchFn: global.fetch
                });
            });

            it('and valid group and user', async () => {
                let client = Zengenti.Contensis.Client.create(getDefaultConfig());

                let result = await client.security.groups.hasUser(defaultGroups[0].id, defaultUsers[0].id);

                expect(global.fetch).toHaveBeenCalledTimes(2);

                expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

                expect((global.fetch as any).calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/security/groups/${defaultGroups[0].id}/users/${defaultUsers[0].id}`,
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

            it('and valid group and user', async () => {
                let client = Zengenti.Contensis.Client.create(getDefaultConfig());

                let result = await client.security.groups.hasUser(defaultGroups[0].id, defaultUsers[0].id);

                expect(global.fetch).toHaveBeenCalledTimes(2);

                expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

                expect((global.fetch as any).calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/security/groups/${defaultGroups[0].id}/users/${defaultUsers[0].id}`,
                    getDefaultFetchRequest('HEAD')
                ]);

                expect(result).toBeFalse();
            });
        });
    });

    describe('Add child group to group', () => {
        beforeEach(() => {
            setDefaultSpy(global, null);

            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });

        it('for valid group and child group', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let result = await client.security.groups.addChildGroup(defaultGroups[0].id, defaultGroups[1].id);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].id}/groups/${defaultGroups[1].id}`,
                getDefaultFetchRequest('PUT')
            ]);

            expect(result).toEqual(null);
        });

    });

    describe('Remove child group from group', () => {
        beforeEach(() => {
            setDefaultSpy(global, null);

            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });

        it('for valid group and child group', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let result = await client.security.groups.removeChildGroup(defaultGroups[0].id, defaultGroups[1].id);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].id}/groups/${defaultGroups[1].id}`,
                getDefaultFetchRequest('DELETE')
            ]);

            expect(result).toEqual(null);
        });

    });

    describe('Gets users in group', () => {
        beforeEach(() => {
            setDefaultSpy(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: defaultUsers
            } as PagedList<Partial<User>>);

            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });

        it('by group id', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let users = await client.security.groups.getUsersByGroupId(defaultGroups[0].id);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].id}/users`,
                getDefaultFetchRequest()
            ]);

            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(defaultUsers[1].username);
        });

        it('by group id with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let users = await client.security.groups.getUsersByGroupId(defaultGroups[0].id, {
                includeInherited: true,
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['username']
            });

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].id}/users?includeInherited=true&order=username&pageIndex=1&pageSize=50`,
                getDefaultFetchRequest()
            ]);

            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(defaultUsers[1].username);
        });

        it('by group name', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let users = await client.security.groups.getUsersByGroupName(defaultGroups[0].name);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].name}/users`,
                getDefaultFetchRequest()
            ]);

            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(defaultUsers[1].username);
        });

        it('by group name with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let users = await client.security.groups.getUsersByGroupName(defaultGroups[0].name, {
                includeInherited: true,
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['username']
            });

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].name}/users?includeInherited=true&order=username&pageIndex=1&pageSize=50`,
                getDefaultFetchRequest()
            ]);

            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(defaultUsers[1].username);
        });
    });

    describe('Gets groups in group', () => {
        beforeEach(() => {
            setDefaultSpy(global, {
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: defaultGroups
            } as PagedList<Partial<Group>>);

            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });

        it('by group id', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let groups = await client.security.groups.getChildGroupsByGroupId(defaultGroups[0].id);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].id}/groups`,
                getDefaultFetchRequest()
            ]);

            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(defaultGroups[1].name);
        });

        it('by group id with options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let groups = await client.security.groups.getChildGroupsByGroupId(defaultGroups[0].id, {
                includeInherited: true,
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['name']
            });

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].id}/groups?includeInherited=true&order=name&pageIndex=1&pageSize=50`,
                getDefaultFetchRequest()
            ]);

            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(defaultGroups[1].name);
        });

        it('by group name', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let users = await client.security.groups.getChildGroupsByGroupName(defaultGroups[0].name);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].name}/groups`,
                getDefaultFetchRequest()
            ]);

            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].name).toEqual(defaultGroups[1].name);
        });

        it('by group name with options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let users = await client.security.groups.getChildGroupsByGroupName(defaultGroups[0].name, {
                includeInherited: true,
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['name']
            });

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/groups/${defaultGroups[0].name}/groups?includeInherited=true&order=name&pageIndex=1&pageSize=50`,
                getDefaultFetchRequest()
            ]);

            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].name).toEqual(defaultGroups[1].name);
        });
    });
});
