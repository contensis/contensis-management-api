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
            (0, specs_utils_spec_1.setDefaultSpy)(global, {
                name: 'project1'
            });
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('With specified root url', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let project = await client.projects.get();
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects/myProject',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(project).not.toBeNull();
            expect(project.name).toEqual('project1');
        });
        it('Without root url (relative)', async () => {
            const config = (0, specs_utils_spec_1.getDefaultConfig)();
            delete config.rootUrl;
            let client = Zengenti.Contensis.Client.create(config);
            let project = await client.projects.get();
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)(true));
            expect(global.fetch.calls.mostRecent().args).toEqual([
                '/api/management/projects/myProject',
                (0, specs_utils_spec_1.getDefaultFetchRequest)(null, true)
            ]);
            expect(project).not.toBeNull();
            expect(project.name).toEqual('project1');
        });
    });
    describe('List projects', () => {
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, [{
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
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            let projects = await client.projects.list();
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects',
                (0, specs_utils_spec_1.getDefaultFetchRequest)()
            ]);
            expect(projects).not.toBeNull();
            expect(projects.length).toEqual(2);
            expect(projects[1].name).toEqual('project2');
        });
    });
    describe('Create project', () => {
        const newProject = {
            id: 'project2',
            name: 'Project 2',
            description: 'Project 2 description',
            primaryLanguage: 'en-GB',
            supportedLanguages: ['fr-FR', 'de-DE']
        };
        beforeEach(() => {
            (0, specs_utils_spec_1.setDefaultSpy)(global, newProject);
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('With specified root url', async () => {
            let client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
            const newProject = {
                id: 'project2',
                name: 'Project 2',
                description: 'Project 2 description',
                primaryLanguage: 'en-GB',
                supportedLanguages: ['fr-FR', 'de-DE'],
                deliverySysExclusions: [],
            };
            let project = await client.projects.create(newProject);
            expect(global.fetch.calls.first().args[0]).toEqual((0, specs_utils_spec_1.getDefaultAuthenticateUrl)());
            expect(global.fetch.calls.mostRecent().args).toEqual([
                'http://my-website.com/api/management/projects',
                (0, specs_utils_spec_1.getDefaultFetchRequest)('POST', null, JSON.stringify(newProject))
            ]);
            expect(project).not.toBeNull();
            expect(project.id).toEqual(newProject.id);
            expect(project.name).toEqual(newProject.name);
        });
    });
});
