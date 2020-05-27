"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contensis = require("../index");
const specs_utils_spec_1 = require("../specs-utils.spec");
const cross_fetch_1 = require("cross-fetch");
const Zengenti = { Contensis };
const global = window || this;
global.fetch = cross_fetch_1.default;
describe('Project Operations', () => {
    describe('Get project', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, {
                name: 'project1'
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('With specified root url', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let project = await client.projects.get();
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject',
                specs_utils_spec_1.getDefaultResponse()
            ]);
            expect(project).not.toBeNull();
            expect(project.name).toEqual('project1');
        });
        it('Without root url (relative)', async () => {
            const config = specs_utils_spec_1.getDefaultConfig();
            delete config.rootUrl;
            let client = Zengenti.Contensis.Client.create(config);
            let project = await client.projects.get();
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl(true));
            expect(global.fetch.calls.mostRecent().args).toEqual([
                '/api/management/projects/myProject',
                specs_utils_spec_1.getDefaultResponse(null, true)
            ]);
            expect(project).not.toBeNull();
            expect(project.name).toEqual('project1');
        });
    });
    describe('List projects', () => {
        beforeEach(() => {
            specs_utils_spec_1.setDefaultSpy(global, [{
                    name: 'project1'
                }, {
                    name: 'project2'
                }]);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('With specified root url', async () => {
            let client = Zengenti.Contensis.Client.create(specs_utils_spec_1.getDefaultConfig());
            let projects = await client.projects.list();
            expect(global.fetch.calls.first().args[0]).toEqual(specs_utils_spec_1.getDefaultAuthenticateUrl());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects',
                specs_utils_spec_1.getDefaultResponse()
            ]);
            expect(projects).not.toBeNull();
            expect(projects.length).toEqual(2);
            expect(projects[1].name).toEqual('project2');
        });
    });
});
