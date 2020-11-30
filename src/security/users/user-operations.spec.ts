import * as Contensis from '../../index';
import { defaultUsers, getDefaultAuthenticateUrl, getDefaultConfig, getDefaultRequest, setDefaultSpy, defaultGroups } from '../../specs-utils.spec';
import fetch from 'cross-fetch';
import { User, Group, UserUpdatePasswordOptions } from '../../models';
import { PagedList } from 'contensis-core-api';

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

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/@current`,
                getDefaultRequest()
            ]);

            expect(user).not.toBeNull();
            expect(user.id).toEqual(defaultUsers[0].id);
        });

        it('by id', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let user = await client.security.users.getById(defaultUsers[0].id);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}`,
                getDefaultRequest()
            ]);

            expect(user).not.toBeNull();
            expect(user.id).toEqual(defaultUsers[0].id);
        });

        it('by username', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let user = await client.security.users.getByUsername(defaultUsers[0].userName);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].userName}`,
                getDefaultRequest()
            ]);

            expect(user).not.toBeNull();
            expect(user.userName).toEqual(defaultUsers[0].userName);
        });

        it('by email', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let user = await client.security.users.getByEmail(defaultUsers[0].email);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].email}`,
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
            } as PagedList<Partial<User>>);

            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });

        it('with default options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let users = await client.security.users.list();

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/users',
                getDefaultRequest()
            ]);

            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].userName).toEqual(defaultUsers[1].userName);
        });

        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let users = await client.security.users.list({
                q: 'content',
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['username']
            });

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/users?order=username&pageIndex=1&pageSize=50&q=content',
                getDefaultRequest()
            ]);

            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].userName).toEqual(defaultUsers[1].userName);
        });

        it('with specific options and no query', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let users = await client.security.users.list({
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['username']
            });

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/users?order=username&pageIndex=1&pageSize=50',
                getDefaultRequest()
            ]);

            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].userName).toEqual(defaultUsers[1].userName);
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

            let user = await client.security.users.create(defaultUsers[0] as User);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users`,
                getDefaultRequest('POST', null, JSON.stringify(defaultUsers[0]))
            ]);

            expect(user).not.toBeNull();
            expect(user.id).toEqual(defaultUsers[0].id);
        });

        it('for valid suspended user', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let user = await client.security.users.create(defaultUsers[0] as User, true);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users?suspended=true`,
                getDefaultRequest('POST', null, JSON.stringify(defaultUsers[0]))
            ]);

            expect(user).not.toBeNull();
            expect(user.id).toEqual(defaultUsers[0].id);
        });

        it('for valid unsuspended user', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let user = await client.security.users.create(defaultUsers[0] as User, false);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users`,
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

            let user = await client.security.users.update(defaultUsers[0] as User);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}`,
                getDefaultRequest('PATCH', null, JSON.stringify(defaultUsers[0]))
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

            let options: UserUpdatePasswordOptions = {
                userId: defaultUsers[0].id,
                new: 'pwd1',
                existing: 'pwd2'
            };

            const { userId, ...requestBody } = options;
            let result = await client.security.users.updatePassword(options);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}/credentials/password`,
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

            let result = await client.security.users.delete(defaultUsers[0].id);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}`,
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

                let result = await client.security.users.userIsMemberOf(defaultUsers[0].id, defaultGroups[0].id);

                expect(global.fetch).toHaveBeenCalledTimes(2);

                expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

                expect((global.fetch as any).calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/security/users/${defaultUsers[0].id}/groups/${defaultGroups[0].id}`,
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

                let result = await client.security.users.userIsMemberOf(defaultUsers[0].id, defaultGroups[0].id);

                expect(global.fetch).toHaveBeenCalledTimes(2);

                expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

                expect((global.fetch as any).calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/security/users/${defaultUsers[0].id}/groups/${defaultGroups[0].id}`,
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

                let result = await client.security.users.userIsMemberOf(defaultUsers[0].id, defaultGroups[0].id, defaultGroups[1].id);

                expect(global.fetch).toHaveBeenCalledTimes(2);

                expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

                expect((global.fetch as any).calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/security/users/${defaultUsers[0].id}/groups/${defaultGroups[0].id},${defaultGroups[1].id}`,
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

                let result = await client.security.users.userIsMemberOf(defaultUsers[0].id, defaultGroups[0].id, defaultGroups[1].id);

                expect(global.fetch).toHaveBeenCalledTimes(2);

                expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

                expect((global.fetch as any).calls.mostRecent().args).toEqual([
                    `http://my-website.com/api/security/users/${defaultUsers[0].id}/groups/${defaultGroups[0].id},${defaultGroups[1].id}`,
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
            } as PagedList<Partial<Group>>);

            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });

        it('with default options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let groups = await client.security.users.getUserGroups(defaultUsers[0].id);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}/groups`,
                getDefaultRequest()
            ]);

            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(defaultGroups[1].name);
        });

        it('with specific options', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let groups = await client.security.users.getUserGroups({
                userId: defaultUsers[0].id,
                includeInherited: true
            });

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}/groups?includeInherited=true`,
                getDefaultRequest()
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

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}/actions`,
                getDefaultRequest('POST', false, JSON.stringify({ type: 'suspend' }))
            ]);

            expect(result).toEqual(null);
        });

        it('unsuspend', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let result = await client.security.users.unsuspendUser(defaultUsers[0].id);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}/actions`,
                getDefaultRequest('POST', false, JSON.stringify({ type: 'unsuspend' }))
            ]);

            expect(result).toEqual(null);
        });

        it('unlock', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let result = await client.security.users.unlockUser(defaultUsers[0].id);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}/actions`,
                getDefaultRequest('POST', false, JSON.stringify({ type: 'unlock' }))
            ]);

            expect(result).toEqual(null);
        });

    });

});
