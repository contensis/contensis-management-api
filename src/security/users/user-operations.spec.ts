import * as Contensis from '../../index';
import { defaultUsers, getDefaultAuthenticateUrl, getDefaultConfig, getDefaultFetchRequest, setDefaultSpy, defaultGroups } from '../../specs-utils.spec';
import fetch from 'cross-fetch';
import { PagedList, toQuery } from 'contensis-core-api';
import { User, Group, UserUpdatePasswordOptions } from '../../models';

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

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
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

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
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

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
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

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
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

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
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

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
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

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/users?pageIndex=0&pageSize=25&zenQL=username%3D%22Geoff%22',
                getDefaultFetchRequest()
            ]);

            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(defaultUsers[1].username);
        });
    });

    describe('Search users', () => {
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

        it('with query as Object', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let orderBy = [{
                desc: 'optOutOfNotifications'
            }, {
                asc: 'username'
            }];

            let where = [{
                field: 'email',
                equalTo: 'EEEEEE2@test.com'
            }, {
                field: 'username',
                in: ['UUUUUU1', 'UUUUUU2']
            }];

            let query = {
                pageIndex: 1,
                pageSize: 50,
                orderBy,
                where
            };

            let users = await client.security.users.search(query as any);

            let expectedQueryString = toQuery({
                ...query,
                orderBy: JSON.stringify(orderBy),
                where: JSON.stringify(where)
            });

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/search${expectedQueryString}`,
                getDefaultFetchRequest()
            ]);

            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(defaultUsers[1].username);
        });

        it('with query as the default Query instance ', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let query = new Contensis.Query();

            let users = await client.security.users.search(query);

            let expectedQueryString = toQuery({
                pageIndex: 0,
                pageSize: 20,
                where: JSON.stringify([])
            });

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/search${expectedQueryString}`,
                getDefaultFetchRequest()
            ]);

            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(defaultUsers[1].username);
        });

        it('with query as a specific Query instance ', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let query = new Contensis.Query(Contensis.Op.startsWith('email', 'EEEEEE2'));
            query.orderBy = Contensis.OrderBy.asc('email');
            query.pageIndex = 1;
            query.pageSize = 50;

            let users = await client.security.users.search(query);

            let expectedQueryString = toQuery({
                pageIndex: 1,
                pageSize: 50,
                orderBy: JSON.stringify([{
                    asc: 'email'
                }]),
                where: JSON.stringify([{
                    field: 'email',
                    startsWith: 'EEEEEE2'
                }])
            });

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/search${expectedQueryString}`,
                getDefaultFetchRequest()
            ]);

            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(defaultUsers[1].username);
        });
    });

    describe('Search users in IE browser', () => {
        beforeEach(() => {
            setDefaultSpy(global, {
                pageCount: 1,
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: defaultUsers
            } as PagedList<Partial<User>>);

            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });

            (global.document as any).documentMode = 11;
        });

        it('with query as Object and url length = 2083', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let orderBy = [{
                asc: 'email'
            }];

            // use string with length = 1896
            let where = [{
                field: 'email',
                // tslint:disable-next-line:max-line-length
                startsWith: 'r2PxHazYJ4WFg6tgJwvNyW03bYFkE6xvnpzJyQHdjXEn4H3rAX0HY08iTHa5mqH7zzjH56xC1j62WYKG759S6YZyP158S4Z3ZqtkTf1KwTKAJEKur45qpXZ7rtt5RTXEkt0waDQy96dLFZjYdQYR9rNRurHtWyahtMgQW9vE3aVwKrHTYM0X817uYpTyCZmq4nr8k5ACijrS9FrSNcNVUgFdVaeEuFHaB6tKGQ1Jew4zeMaeZrqbF4v11GaA754ykEDWN8GbY3qhf5RuVaPktFYNJK6PeZkkmxEAVk7DQ2x7W62Y4n3GUmZbi6nwKXrLUrfGHeqR2h2b79A12CzpFHWxhnZ8hm3jRP0AP5085Sh2VtLGbCFMcVEC1bVrr5gFN26LPyTn1gvv6BJ1jUNfZ8JJGV0QA63VQJiqLLigvpYQJU1FJzFhj7rFBREaFCrVhPaZw5pSjD8kZi30i82Zh8VEMmXgEiLFPc8jHJ45wRzpu898NgjKv53bYBHYWqgyEpZF5pg2B1cqq5fLnfarUFKENCaPqxiqhjhMJ1SHC0e8kfLM4zR0TdkC6r7G9Dp4WLc3v0wcveapUjtzL3LEWFYJZpHix9RNCBd7AWzY0PDXih9DMc59frTe7U7GEqXzd36LrYVR8Auv5vwiXzu4fdwihCbeiinHnWnZwtQTJHYKZHLDdD9zMj1CAyEbNTm327NfuDZMQGEYjU8JB0yjhND05MNraL9FXx29iNVTht3j4PxMb3CMQqcBwH22UejpUzxE0mcbKEPvTPVEuP8d6ptBQN3mKc6v5MZ47YqdBqWSxBKDbxDpr7eGNHqrKXP0jUXwavNcAhMWmnE8zxSVKEHWhwdrZnJP1hNz0XtKQaTPBxHZErHcic8z806iHEdVaPGG7Q76ySVh58rNGX8tinEYCNT9eAJizCCKGpvCvkL52VHjChKcMc50ggDHTa6dwmhx6Q9Gjj4YE0XTbcVLQxHf0B4aPgcegRyG82MmBgUz8cwi5R4T8LhyeazQd3ER46DKt9YJBp9LAJXarc7WV6Axn88CviugeSEqH2vaF6Cy0Q6Xcx8tTE9QeiyTtHmMZrKKzMuzw4YD3GeXA7qqGjeQqcJQiF4KMbYzqXPUj7KVH2tg8pVXiFYqYuxEf61TzGab7WcEE7fU9V7rq1M6uqLiZC1KaPr8jM08DYMhjrmaJT6S9ZxfuqUdh6rjJJr5NvxZikhr9XXAKeL7RhgQjq12ZCDMjpDaPmKMufEVt9UTZcve6P7v1q6XYT7qJkpbYBfhn6vSh4XJBjuXDk4SkNu4cxC8F0D8zmU9jH7N1RNJ9nMEeSStafMV01W7aqABTXzz0eKkTUJuCX9UNTLuV2gAHnPkT3MGSjGC9UaJe5qbGUdcXqDjc6UgA9xCq2MUHRP2CQuxHTRHdKur2uyNi9M7Q2gULbVryeW3R38XRvekMSnHYSqSdDrx0dQRTZ4edMuA2t58LdA8kf6LxZrhdjH2FkGcXhAa8ZP4wjGe1ujPrPtnmK8TMmRr4AELcmLkb0AfX3QUNfv1DR2kqyT8Ja2WmGQHR35huMgek3ePB4NMCY6kZH09wfiSLxy68Pyir0huGVYHb4HdhMEEf89SmNaFHuFYgiTGRZexDfTSiaj4Rn04TR359AkNVibyT2E93ee8PN2Qv0vbBTG1nebXyuX7KRYQqBaSrchJFrc0jCGHgCR7mfMAgpPyCEd0Piyg3P3fCQFP0Uq7ADFAfEDgHa9SXHJmhJVwwYC7EUGBqHpFuQZiJAKFdZSUtNFEGDztmjEBwadeVT6vuZW3QUnpYUL4q9t7nQgYqf03jfnh90pzBTFqLTaebr8QkMxGSpHezJnevrBu8SKteUG5vjPEC0kdQKDnXn563AdxdD0w'
            }];
            let query = {
                pageIndex: 1,
                pageSize: 50,
                orderBy,
                where
            };

            let users = await client.security.users.search(query as any);

            let expectedQueryString = toQuery({
                ...query,
                orderBy: JSON.stringify(orderBy),
                where: JSON.stringify(where)
            });

            let url = `http://my-website.com/api/security/users/search${expectedQueryString}`;

            expect(url.length).toEqual(2083);
            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                url,
                getDefaultFetchRequest()
            ]);

            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(defaultUsers[1].username);
        });

        it('with query as Object and url length > 2083', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let orderBy = [{
                asc: 'email'
            }];

            // use string with length = 1897
            let where = [{
                field: 'email',
                // tslint:disable-next-line:max-line-length
                startsWith: '1r2PxHazYJ4WFg6tgJwvNyW03bYFkE6xvnpzJyQHdjXEn4H3rAX0HY08iTHa5mqH7zzjH56xC1j62WYKG759S6YZyP158S4Z3ZqtkTf1KwTKAJEKur45qpXZ7rtt5RTXEkt0waDQy96dLFZjYdQYR9rNRurHtWyahtMgQW9vE3aVwKrHTYM0X817uYpTyCZmq4nr8k5ACijrS9FrSNcNVUgFdVaeEuFHaB6tKGQ1Jew4zeMaeZrqbF4v11GaA754ykEDWN8GbY3qhf5RuVaPktFYNJK6PeZkkmxEAVk7DQ2x7W62Y4n3GUmZbi6nwKXrLUrfGHeqR2h2b79A12CzpFHWxhnZ8hm3jRP0AP5085Sh2VtLGbCFMcVEC1bVrr5gFN26LPyTn1gvv6BJ1jUNfZ8JJGV0QA63VQJiqLLigvpYQJU1FJzFhj7rFBREaFCrVhPaZw5pSjD8kZi30i82Zh8VEMmXgEiLFPc8jHJ45wRzpu898NgjKv53bYBHYWqgyEpZF5pg2B1cqq5fLnfarUFKENCaPqxiqhjhMJ1SHC0e8kfLM4zR0TdkC6r7G9Dp4WLc3v0wcveapUjtzL3LEWFYJZpHix9RNCBd7AWzY0PDXih9DMc59frTe7U7GEqXzd36LrYVR8Auv5vwiXzu4fdwihCbeiinHnWnZwtQTJHYKZHLDdD9zMj1CAyEbNTm327NfuDZMQGEYjU8JB0yjhND05MNraL9FXx29iNVTht3j4PxMb3CMQqcBwH22UejpUzxE0mcbKEPvTPVEuP8d6ptBQN3mKc6v5MZ47YqdBqWSxBKDbxDpr7eGNHqrKXP0jUXwavNcAhMWmnE8zxSVKEHWhwdrZnJP1hNz0XtKQaTPBxHZErHcic8z806iHEdVaPGG7Q76ySVh58rNGX8tinEYCNT9eAJizCCKGpvCvkL52VHjChKcMc50ggDHTa6dwmhx6Q9Gjj4YE0XTbcVLQxHf0B4aPgcegRyG82MmBgUz8cwi5R4T8LhyeazQd3ER46DKt9YJBp9LAJXarc7WV6Axn88CviugeSEqH2vaF6Cy0Q6Xcx8tTE9QeiyTtHmMZrKKzMuzw4YD3GeXA7qqGjeQqcJQiF4KMbYzqXPUj7KVH2tg8pVXiFYqYuxEf61TzGab7WcEE7fU9V7rq1M6uqLiZC1KaPr8jM08DYMhjrmaJT6S9ZxfuqUdh6rjJJr5NvxZikhr9XXAKeL7RhgQjq12ZCDMjpDaPmKMufEVt9UTZcve6P7v1q6XYT7qJkpbYBfhn6vSh4XJBjuXDk4SkNu4cxC8F0D8zmU9jH7N1RNJ9nMEeSStafMV01W7aqABTXzz0eKkTUJuCX9UNTLuV2gAHnPkT3MGSjGC9UaJe5qbGUdcXqDjc6UgA9xCq2MUHRP2CQuxHTRHdKur2uyNi9M7Q2gULbVryeW3R38XRvekMSnHYSqSdDrx0dQRTZ4edMuA2t58LdA8kf6LxZrhdjH2FkGcXhAa8ZP4wjGe1ujPrPtnmK8TMmRr4AELcmLkb0AfX3QUNfv1DR2kqyT8Ja2WmGQHR35huMgek3ePB4NMCY6kZH09wfiSLxy68Pyir0huGVYHb4HdhMEEf89SmNaFHuFYgiTGRZexDfTSiaj4Rn04TR359AkNVibyT2E93ee8PN2Qv0vbBTG1nebXyuX7KRYQqBaSrchJFrc0jCGHgCR7mfMAgpPyCEd0Piyg3P3fCQFP0Uq7ADFAfEDgHa9SXHJmhJVwwYC7EUGBqHpFuQZiJAKFdZSUtNFEGDztmjEBwadeVT6vuZW3QUnpYUL4q9t7nQgYqf03jfnh90pzBTFqLTaebr8QkMxGSpHezJnevrBu8SKteUG5vjPEC0kdQKDnXn563AdxdD0w'
            }];
            let query = {
                pageIndex: 1,
                pageSize: 50,
                orderBy,
                where
            };

            let users = await client.security.users.search(query as any);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/search`,
                getDefaultFetchRequest('POST', false, JSON.stringify(query))
            ]);

            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(defaultUsers[1].username);
        });

        it('with query as Query instance and url length = 2083', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            // use string with length = 1896

            // tslint:disable-next-line:max-line-length
            const startsWithText = 'r2PxHazYJ4WFg6tgJwvNyW03bYFkE6xvnpzJyQHdjXEn4H3rAX0HY08iTHa5mqH7zzjH56xC1j62WYKG759S6YZyP158S4Z3ZqtkTf1KwTKAJEKur45qpXZ7rtt5RTXEkt0waDQy96dLFZjYdQYR9rNRurHtWyahtMgQW9vE3aVwKrHTYM0X817uYpTyCZmq4nr8k5ACijrS9FrSNcNVUgFdVaeEuFHaB6tKGQ1Jew4zeMaeZrqbF4v11GaA754ykEDWN8GbY3qhf5RuVaPktFYNJK6PeZkkmxEAVk7DQ2x7W62Y4n3GUmZbi6nwKXrLUrfGHeqR2h2b79A12CzpFHWxhnZ8hm3jRP0AP5085Sh2VtLGbCFMcVEC1bVrr5gFN26LPyTn1gvv6BJ1jUNfZ8JJGV0QA63VQJiqLLigvpYQJU1FJzFhj7rFBREaFCrVhPaZw5pSjD8kZi30i82Zh8VEMmXgEiLFPc8jHJ45wRzpu898NgjKv53bYBHYWqgyEpZF5pg2B1cqq5fLnfarUFKENCaPqxiqhjhMJ1SHC0e8kfLM4zR0TdkC6r7G9Dp4WLc3v0wcveapUjtzL3LEWFYJZpHix9RNCBd7AWzY0PDXih9DMc59frTe7U7GEqXzd36LrYVR8Auv5vwiXzu4fdwihCbeiinHnWnZwtQTJHYKZHLDdD9zMj1CAyEbNTm327NfuDZMQGEYjU8JB0yjhND05MNraL9FXx29iNVTht3j4PxMb3CMQqcBwH22UejpUzxE0mcbKEPvTPVEuP8d6ptBQN3mKc6v5MZ47YqdBqWSxBKDbxDpr7eGNHqrKXP0jUXwavNcAhMWmnE8zxSVKEHWhwdrZnJP1hNz0XtKQaTPBxHZErHcic8z806iHEdVaPGG7Q76ySVh58rNGX8tinEYCNT9eAJizCCKGpvCvkL52VHjChKcMc50ggDHTa6dwmhx6Q9Gjj4YE0XTbcVLQxHf0B4aPgcegRyG82MmBgUz8cwi5R4T8LhyeazQd3ER46DKt9YJBp9LAJXarc7WV6Axn88CviugeSEqH2vaF6Cy0Q6Xcx8tTE9QeiyTtHmMZrKKzMuzw4YD3GeXA7qqGjeQqcJQiF4KMbYzqXPUj7KVH2tg8pVXiFYqYuxEf61TzGab7WcEE7fU9V7rq1M6uqLiZC1KaPr8jM08DYMhjrmaJT6S9ZxfuqUdh6rjJJr5NvxZikhr9XXAKeL7RhgQjq12ZCDMjpDaPmKMufEVt9UTZcve6P7v1q6XYT7qJkpbYBfhn6vSh4XJBjuXDk4SkNu4cxC8F0D8zmU9jH7N1RNJ9nMEeSStafMV01W7aqABTXzz0eKkTUJuCX9UNTLuV2gAHnPkT3MGSjGC9UaJe5qbGUdcXqDjc6UgA9xCq2MUHRP2CQuxHTRHdKur2uyNi9M7Q2gULbVryeW3R38XRvekMSnHYSqSdDrx0dQRTZ4edMuA2t58LdA8kf6LxZrhdjH2FkGcXhAa8ZP4wjGe1ujPrPtnmK8TMmRr4AELcmLkb0AfX3QUNfv1DR2kqyT8Ja2WmGQHR35huMgek3ePB4NMCY6kZH09wfiSLxy68Pyir0huGVYHb4HdhMEEf89SmNaFHuFYgiTGRZexDfTSiaj4Rn04TR359AkNVibyT2E93ee8PN2Qv0vbBTG1nebXyuX7KRYQqBaSrchJFrc0jCGHgCR7mfMAgpPyCEd0Piyg3P3fCQFP0Uq7ADFAfEDgHa9SXHJmhJVwwYC7EUGBqHpFuQZiJAKFdZSUtNFEGDztmjEBwadeVT6vuZW3QUnpYUL4q9t7nQgYqf03jfnh90pzBTFqLTaebr8QkMxGSpHezJnevrBu8SKteUG5vjPEC0kdQKDnXn563AdxdD0w';
            let query = new Contensis.Query(Contensis.Op.startsWith('email', startsWithText));
            query.orderBy = Contensis.OrderBy.asc('email');
            query.pageIndex = 1;
            query.pageSize = 50;

            let users = await client.security.users.search(query);

            let expectedQueryString = toQuery({
                pageIndex: 1,
                pageSize: 50,
                orderBy: JSON.stringify([{
                    asc: 'email'
                }]),
                where: JSON.stringify([{
                    field: 'email',
                    startsWith: startsWithText
                }])
            });

            let url = `http://my-website.com/api/security/users/search${expectedQueryString}`;

            expect(url.length).toEqual(2083);
            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                url,
                getDefaultFetchRequest()
            ]);

            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(defaultUsers[1].username);
        });

        it('with query as Query instance and url length > 2083', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            // use string with length = 1897

            // tslint:disable-next-line:max-line-length
            const startsWithText = '1r2PxHazYJ4WFg6tgJwvNyW03bYFkE6xvnpzJyQHdjXEn4H3rAX0HY08iTHa5mqH7zzjH56xC1j62WYKG759S6YZyP158S4Z3ZqtkTf1KwTKAJEKur45qpXZ7rtt5RTXEkt0waDQy96dLFZjYdQYR9rNRurHtWyahtMgQW9vE3aVwKrHTYM0X817uYpTyCZmq4nr8k5ACijrS9FrSNcNVUgFdVaeEuFHaB6tKGQ1Jew4zeMaeZrqbF4v11GaA754ykEDWN8GbY3qhf5RuVaPktFYNJK6PeZkkmxEAVk7DQ2x7W62Y4n3GUmZbi6nwKXrLUrfGHeqR2h2b79A12CzpFHWxhnZ8hm3jRP0AP5085Sh2VtLGbCFMcVEC1bVrr5gFN26LPyTn1gvv6BJ1jUNfZ8JJGV0QA63VQJiqLLigvpYQJU1FJzFhj7rFBREaFCrVhPaZw5pSjD8kZi30i82Zh8VEMmXgEiLFPc8jHJ45wRzpu898NgjKv53bYBHYWqgyEpZF5pg2B1cqq5fLnfarUFKENCaPqxiqhjhMJ1SHC0e8kfLM4zR0TdkC6r7G9Dp4WLc3v0wcveapUjtzL3LEWFYJZpHix9RNCBd7AWzY0PDXih9DMc59frTe7U7GEqXzd36LrYVR8Auv5vwiXzu4fdwihCbeiinHnWnZwtQTJHYKZHLDdD9zMj1CAyEbNTm327NfuDZMQGEYjU8JB0yjhND05MNraL9FXx29iNVTht3j4PxMb3CMQqcBwH22UejpUzxE0mcbKEPvTPVEuP8d6ptBQN3mKc6v5MZ47YqdBqWSxBKDbxDpr7eGNHqrKXP0jUXwavNcAhMWmnE8zxSVKEHWhwdrZnJP1hNz0XtKQaTPBxHZErHcic8z806iHEdVaPGG7Q76ySVh58rNGX8tinEYCNT9eAJizCCKGpvCvkL52VHjChKcMc50ggDHTa6dwmhx6Q9Gjj4YE0XTbcVLQxHf0B4aPgcegRyG82MmBgUz8cwi5R4T8LhyeazQd3ER46DKt9YJBp9LAJXarc7WV6Axn88CviugeSEqH2vaF6Cy0Q6Xcx8tTE9QeiyTtHmMZrKKzMuzw4YD3GeXA7qqGjeQqcJQiF4KMbYzqXPUj7KVH2tg8pVXiFYqYuxEf61TzGab7WcEE7fU9V7rq1M6uqLiZC1KaPr8jM08DYMhjrmaJT6S9ZxfuqUdh6rjJJr5NvxZikhr9XXAKeL7RhgQjq12ZCDMjpDaPmKMufEVt9UTZcve6P7v1q6XYT7qJkpbYBfhn6vSh4XJBjuXDk4SkNu4cxC8F0D8zmU9jH7N1RNJ9nMEeSStafMV01W7aqABTXzz0eKkTUJuCX9UNTLuV2gAHnPkT3MGSjGC9UaJe5qbGUdcXqDjc6UgA9xCq2MUHRP2CQuxHTRHdKur2uyNi9M7Q2gULbVryeW3R38XRvekMSnHYSqSdDrx0dQRTZ4edMuA2t58LdA8kf6LxZrhdjH2FkGcXhAa8ZP4wjGe1ujPrPtnmK8TMmRr4AELcmLkb0AfX3QUNfv1DR2kqyT8Ja2WmGQHR35huMgek3ePB4NMCY6kZH09wfiSLxy68Pyir0huGVYHb4HdhMEEf89SmNaFHuFYgiTGRZexDfTSiaj4Rn04TR359AkNVibyT2E93ee8PN2Qv0vbBTG1nebXyuX7KRYQqBaSrchJFrc0jCGHgCR7mfMAgpPyCEd0Piyg3P3fCQFP0Uq7ADFAfEDgHa9SXHJmhJVwwYC7EUGBqHpFuQZiJAKFdZSUtNFEGDztmjEBwadeVT6vuZW3QUnpYUL4q9t7nQgYqf03jfnh90pzBTFqLTaebr8QkMxGSpHezJnevrBu8SKteUG5vjPEC0kdQKDnXn563AdxdD0w';

            let query = new Contensis.Query(Contensis.Op.startsWith('email', startsWithText));
            query.orderBy = Contensis.OrderBy.asc('email');
            query.pageIndex = 1;
            query.pageSize = 50;

            let users = await client.security.users.search(query);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/search`,
                getDefaultFetchRequest('POST', false, JSON.stringify(query))
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

            let user = await client.security.users.create(defaultUsers[0] as User);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users`,
                getDefaultFetchRequest('POST', null, JSON.stringify(defaultUsers[0]))
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
                getDefaultFetchRequest('POST', null, JSON.stringify(defaultUsers[0]))
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

            let user = await client.security.users.update(defaultUsers[0] as User);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
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

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
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

                expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

                expect((global.fetch as any).calls.mostRecent().args).toEqual([
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

                expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

                expect((global.fetch as any).calls.mostRecent().args).toEqual([
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

                expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

                expect((global.fetch as any).calls.mostRecent().args).toEqual([
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

                expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

                expect((global.fetch as any).calls.mostRecent().args).toEqual([
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

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}/groups?includeInherited=true&order=name&pageIndex=1&pageSize=50`,
                getDefaultFetchRequest()
            ]);

            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(defaultGroups[1].name);
        });

        it('with specific options and an exclusion group.', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let groups = await client.security.users.getUserGroups({
                userId: defaultUsers[0].id,
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['name'],
                includeInherited: true,
                excludedGroups: ['abc']
            });

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}/groups?excludedGroups=abc&includeInherited=true&order=name&pageIndex=1&pageSize=50`,
                getDefaultFetchRequest()
            ]);

            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(defaultGroups[1].name);
        });

        it('with specific options and many exclusion groups.', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let groups = await client.security.users.getUserGroups({
                userId: defaultUsers[0].id,
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['name'],
                includeInherited: true,
                excludedGroups: ['abc', 'def', 'hij']
            });

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}/groups?excludedGroups=abc%2Cdef%2Chij&includeInherited=true&order=name&pageIndex=1&pageSize=50`,
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

        it('setPasswordToExpirable', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let result = await client.security.users.setPasswordToExpirable(defaultUsers[0].id);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}/actions`,
                getDefaultFetchRequest('POST', false, JSON.stringify({ type: 'setPasswordToExpirable' }))
            ]);

            expect(result).toEqual(null);
        });

        it('suspend', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());

            let result = await client.security.users.suspendUser(defaultUsers[0].id);

            expect(global.fetch).toHaveBeenCalledTimes(2);

            expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

            expect((global.fetch as any).calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${defaultUsers[0].id}/actions`,
                getDefaultFetchRequest('POST', false, JSON.stringify({ type: 'suspend' }))
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
                getDefaultFetchRequest('POST', false, JSON.stringify({ type: 'unsuspend' }))
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
                getDefaultFetchRequest('POST', false, JSON.stringify({ type: 'unlock' }))
            ]);

            expect(result).toEqual(null);
        });

    });

});
