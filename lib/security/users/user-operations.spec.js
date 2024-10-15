"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Contensis = require("../../index");
const specs_utils_spec_1 = require("../../specs-utils.spec");
const cross_fetch_1 = require("cross-fetch");
const contensis_core_api_1 = require("contensis-core-api");
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
            expect(user.optOutOfNotifications).toBeTrue();
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
        it('by classic id', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let user = await client.security.users.getById(specs_utils_spec_1.defaultUsers[0].id, true);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}?classicUserId=true`,
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
        it('with zenQL', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let users = await client.security.users.list({
                zenQL: 'username="Geoff"'
            });
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/security/users?pageIndex=0&pageSize=25&zenQL=username%3D%22Geoff%22',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(specs_utils_spec_1.defaultUsers[1].username);
        });
    });
    describe('Search users', () => {
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
        it('with query as Object', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
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
            let users = await client.security.users.search(query);
            let expectedQueryString = (0, contensis_core_api_1.toQuery)(Object.assign(Object.assign({}, query), { orderBy: JSON.stringify(orderBy), where: JSON.stringify(where) }));
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/search${expectedQueryString}`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(specs_utils_spec_1.defaultUsers[1].username);
        });
        it('with query as the default Query instance ', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let query = new Contensis.Query();
            let users = await client.security.users.search(query);
            let expectedQueryString = (0, contensis_core_api_1.toQuery)({
                pageIndex: 0,
                pageSize: 20,
                where: JSON.stringify([])
            });
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/search${expectedQueryString}`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(specs_utils_spec_1.defaultUsers[1].username);
        });
        it('with query as a specific Query instance ', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let query = new Contensis.Query(Contensis.Op.startsWith('email', 'EEEEEE2'));
            query.orderBy = Contensis.OrderBy.asc('email');
            query.pageIndex = 1;
            query.pageSize = 50;
            let users = await client.security.users.search(query);
            let expectedQueryString = (0, contensis_core_api_1.toQuery)({
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
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/search${expectedQueryString}`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(specs_utils_spec_1.defaultUsers[1].username);
        });
    });
    describe('Search users in IE browser', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, {
                pageCount: 1,
                pageIndex: 0,
                pageSize: 25,
                totalCount: 2,
                items: specs_utils_spec_1.defaultUsers
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
            global.document.documentMode = 11;
        });
        it('with query as Object and url length = 2083', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
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
            let users = await client.security.users.search(query);
            let expectedQueryString = (0, contensis_core_api_1.toQuery)(Object.assign(Object.assign({}, query), { orderBy: JSON.stringify(orderBy), where: JSON.stringify(where) }));
            let url = `http://my-website.com/api/security/users/search${expectedQueryString}`;
            expect(url.length).toEqual(2083);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                url,
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(specs_utils_spec_1.defaultUsers[1].username);
        });
        it('with query as Object and url length > 2083', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
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
            let users = await client.security.users.search(query);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/search`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)('POST', false, JSON.stringify(query))
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(specs_utils_spec_1.defaultUsers[1].username);
        });
        it('with query as Query instance and url length = 2083', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            // use string with length = 1896
            // tslint:disable-next-line:max-line-length
            const startsWithText = 'r2PxHazYJ4WFg6tgJwvNyW03bYFkE6xvnpzJyQHdjXEn4H3rAX0HY08iTHa5mqH7zzjH56xC1j62WYKG759S6YZyP158S4Z3ZqtkTf1KwTKAJEKur45qpXZ7rtt5RTXEkt0waDQy96dLFZjYdQYR9rNRurHtWyahtMgQW9vE3aVwKrHTYM0X817uYpTyCZmq4nr8k5ACijrS9FrSNcNVUgFdVaeEuFHaB6tKGQ1Jew4zeMaeZrqbF4v11GaA754ykEDWN8GbY3qhf5RuVaPktFYNJK6PeZkkmxEAVk7DQ2x7W62Y4n3GUmZbi6nwKXrLUrfGHeqR2h2b79A12CzpFHWxhnZ8hm3jRP0AP5085Sh2VtLGbCFMcVEC1bVrr5gFN26LPyTn1gvv6BJ1jUNfZ8JJGV0QA63VQJiqLLigvpYQJU1FJzFhj7rFBREaFCrVhPaZw5pSjD8kZi30i82Zh8VEMmXgEiLFPc8jHJ45wRzpu898NgjKv53bYBHYWqgyEpZF5pg2B1cqq5fLnfarUFKENCaPqxiqhjhMJ1SHC0e8kfLM4zR0TdkC6r7G9Dp4WLc3v0wcveapUjtzL3LEWFYJZpHix9RNCBd7AWzY0PDXih9DMc59frTe7U7GEqXzd36LrYVR8Auv5vwiXzu4fdwihCbeiinHnWnZwtQTJHYKZHLDdD9zMj1CAyEbNTm327NfuDZMQGEYjU8JB0yjhND05MNraL9FXx29iNVTht3j4PxMb3CMQqcBwH22UejpUzxE0mcbKEPvTPVEuP8d6ptBQN3mKc6v5MZ47YqdBqWSxBKDbxDpr7eGNHqrKXP0jUXwavNcAhMWmnE8zxSVKEHWhwdrZnJP1hNz0XtKQaTPBxHZErHcic8z806iHEdVaPGG7Q76ySVh58rNGX8tinEYCNT9eAJizCCKGpvCvkL52VHjChKcMc50ggDHTa6dwmhx6Q9Gjj4YE0XTbcVLQxHf0B4aPgcegRyG82MmBgUz8cwi5R4T8LhyeazQd3ER46DKt9YJBp9LAJXarc7WV6Axn88CviugeSEqH2vaF6Cy0Q6Xcx8tTE9QeiyTtHmMZrKKzMuzw4YD3GeXA7qqGjeQqcJQiF4KMbYzqXPUj7KVH2tg8pVXiFYqYuxEf61TzGab7WcEE7fU9V7rq1M6uqLiZC1KaPr8jM08DYMhjrmaJT6S9ZxfuqUdh6rjJJr5NvxZikhr9XXAKeL7RhgQjq12ZCDMjpDaPmKMufEVt9UTZcve6P7v1q6XYT7qJkpbYBfhn6vSh4XJBjuXDk4SkNu4cxC8F0D8zmU9jH7N1RNJ9nMEeSStafMV01W7aqABTXzz0eKkTUJuCX9UNTLuV2gAHnPkT3MGSjGC9UaJe5qbGUdcXqDjc6UgA9xCq2MUHRP2CQuxHTRHdKur2uyNi9M7Q2gULbVryeW3R38XRvekMSnHYSqSdDrx0dQRTZ4edMuA2t58LdA8kf6LxZrhdjH2FkGcXhAa8ZP4wjGe1ujPrPtnmK8TMmRr4AELcmLkb0AfX3QUNfv1DR2kqyT8Ja2WmGQHR35huMgek3ePB4NMCY6kZH09wfiSLxy68Pyir0huGVYHb4HdhMEEf89SmNaFHuFYgiTGRZexDfTSiaj4Rn04TR359AkNVibyT2E93ee8PN2Qv0vbBTG1nebXyuX7KRYQqBaSrchJFrc0jCGHgCR7mfMAgpPyCEd0Piyg3P3fCQFP0Uq7ADFAfEDgHa9SXHJmhJVwwYC7EUGBqHpFuQZiJAKFdZSUtNFEGDztmjEBwadeVT6vuZW3QUnpYUL4q9t7nQgYqf03jfnh90pzBTFqLTaebr8QkMxGSpHezJnevrBu8SKteUG5vjPEC0kdQKDnXn563AdxdD0w';
            let query = new Contensis.Query(Contensis.Op.startsWith('email', startsWithText));
            query.orderBy = Contensis.OrderBy.asc('email');
            query.pageIndex = 1;
            query.pageSize = 50;
            let users = await client.security.users.search(query);
            let expectedQueryString = (0, contensis_core_api_1.toQuery)({
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
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                url,
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(users).not.toBeNull();
            expect(users.items.length).toEqual(2);
            expect(users.items[1].username).toEqual(specs_utils_spec_1.defaultUsers[1].username);
        });
        it('with query as Query instance and url length > 2083', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            // use string with length = 1897
            // tslint:disable-next-line:max-line-length
            const startsWithText = '1r2PxHazYJ4WFg6tgJwvNyW03bYFkE6xvnpzJyQHdjXEn4H3rAX0HY08iTHa5mqH7zzjH56xC1j62WYKG759S6YZyP158S4Z3ZqtkTf1KwTKAJEKur45qpXZ7rtt5RTXEkt0waDQy96dLFZjYdQYR9rNRurHtWyahtMgQW9vE3aVwKrHTYM0X817uYpTyCZmq4nr8k5ACijrS9FrSNcNVUgFdVaeEuFHaB6tKGQ1Jew4zeMaeZrqbF4v11GaA754ykEDWN8GbY3qhf5RuVaPktFYNJK6PeZkkmxEAVk7DQ2x7W62Y4n3GUmZbi6nwKXrLUrfGHeqR2h2b79A12CzpFHWxhnZ8hm3jRP0AP5085Sh2VtLGbCFMcVEC1bVrr5gFN26LPyTn1gvv6BJ1jUNfZ8JJGV0QA63VQJiqLLigvpYQJU1FJzFhj7rFBREaFCrVhPaZw5pSjD8kZi30i82Zh8VEMmXgEiLFPc8jHJ45wRzpu898NgjKv53bYBHYWqgyEpZF5pg2B1cqq5fLnfarUFKENCaPqxiqhjhMJ1SHC0e8kfLM4zR0TdkC6r7G9Dp4WLc3v0wcveapUjtzL3LEWFYJZpHix9RNCBd7AWzY0PDXih9DMc59frTe7U7GEqXzd36LrYVR8Auv5vwiXzu4fdwihCbeiinHnWnZwtQTJHYKZHLDdD9zMj1CAyEbNTm327NfuDZMQGEYjU8JB0yjhND05MNraL9FXx29iNVTht3j4PxMb3CMQqcBwH22UejpUzxE0mcbKEPvTPVEuP8d6ptBQN3mKc6v5MZ47YqdBqWSxBKDbxDpr7eGNHqrKXP0jUXwavNcAhMWmnE8zxSVKEHWhwdrZnJP1hNz0XtKQaTPBxHZErHcic8z806iHEdVaPGG7Q76ySVh58rNGX8tinEYCNT9eAJizCCKGpvCvkL52VHjChKcMc50ggDHTa6dwmhx6Q9Gjj4YE0XTbcVLQxHf0B4aPgcegRyG82MmBgUz8cwi5R4T8LhyeazQd3ER46DKt9YJBp9LAJXarc7WV6Axn88CviugeSEqH2vaF6Cy0Q6Xcx8tTE9QeiyTtHmMZrKKzMuzw4YD3GeXA7qqGjeQqcJQiF4KMbYzqXPUj7KVH2tg8pVXiFYqYuxEf61TzGab7WcEE7fU9V7rq1M6uqLiZC1KaPr8jM08DYMhjrmaJT6S9ZxfuqUdh6rjJJr5NvxZikhr9XXAKeL7RhgQjq12ZCDMjpDaPmKMufEVt9UTZcve6P7v1q6XYT7qJkpbYBfhn6vSh4XJBjuXDk4SkNu4cxC8F0D8zmU9jH7N1RNJ9nMEeSStafMV01W7aqABTXzz0eKkTUJuCX9UNTLuV2gAHnPkT3MGSjGC9UaJe5qbGUdcXqDjc6UgA9xCq2MUHRP2CQuxHTRHdKur2uyNi9M7Q2gULbVryeW3R38XRvekMSnHYSqSdDrx0dQRTZ4edMuA2t58LdA8kf6LxZrhdjH2FkGcXhAa8ZP4wjGe1ujPrPtnmK8TMmRr4AELcmLkb0AfX3QUNfv1DR2kqyT8Ja2WmGQHR35huMgek3ePB4NMCY6kZH09wfiSLxy68Pyir0huGVYHb4HdhMEEf89SmNaFHuFYgiTGRZexDfTSiaj4Rn04TR359AkNVibyT2E93ee8PN2Qv0vbBTG1nebXyuX7KRYQqBaSrchJFrc0jCGHgCR7mfMAgpPyCEd0Piyg3P3fCQFP0Uq7ADFAfEDgHa9SXHJmhJVwwYC7EUGBqHpFuQZiJAKFdZSUtNFEGDztmjEBwadeVT6vuZW3QUnpYUL4q9t7nQgYqf03jfnh90pzBTFqLTaebr8QkMxGSpHezJnevrBu8SKteUG5vjPEC0kdQKDnXn563AdxdD0w';
            let query = new Contensis.Query(Contensis.Op.startsWith('email', startsWithText));
            query.orderBy = Contensis.OrderBy.asc('email');
            query.pageIndex = 1;
            query.pageSize = 50;
            let users = await client.security.users.search(query);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/search`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)('POST', false, JSON.stringify(query))
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
        it('with specific options and an exclusion group.', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let groups = await client.security.users.getUserGroups({
                userId: specs_utils_spec_1.defaultUsers[0].id,
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['name'],
                includeInherited: true,
                excludedGroups: ['abc']
            });
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/groups?excludedGroups=abc&includeInherited=true&order=name&pageIndex=1&pageSize=50`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(groups).not.toBeNull();
            expect(groups.items.length).toEqual(2);
            expect(groups.items[1].name).toEqual(specs_utils_spec_1.defaultGroups[1].name);
        });
        it('with specific options and many exclusion groups.', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let groups = await client.security.users.getUserGroups({
                userId: specs_utils_spec_1.defaultUsers[0].id,
                pageOptions: { pageIndex: 1, pageSize: 50 },
                order: ['name'],
                includeInherited: true,
                excludedGroups: ['abc', 'def', 'hij']
            });
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/groups?excludedGroups=abc%2Cdef%2Chij&includeInherited=true&order=name&pageIndex=1&pageSize=50`,
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
        it('setPasswordToExpirable', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let result = await client.security.users.setPasswordToExpirable(specs_utils_spec_1.defaultUsers[0].id);
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                `http://my-website.com/api/security/users/${specs_utils_spec_1.defaultUsers[0].id}/actions`,
                (0, specs_utils_spec_1.getDefaultFetchRequest)('POST', false, JSON.stringify({ type: 'setPasswordToExpirable' }))
            ]);
            expect(result).toEqual(null);
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
