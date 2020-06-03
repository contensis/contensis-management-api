import * as Contensis from '../index';
import { getDefaultAuthenticateUrl, getDefaultConfig, getDefaultRequest, setDefaultSpy } from '../specs-utils.spec';
import fetch from 'cross-fetch';
import { Project } from 'contensis-core-api';

const Zengenti = { Contensis };
const global = window || this;
global.fetch = fetch;

describe('Project Operations', () => {

	describe('Get project', () => {
		beforeEach(() => {
			setDefaultSpy(global, {
				name: 'project1'
			} as Partial<Project>);

			Zengenti.Contensis.Client.defaultClientConfig = null;
			Zengenti.Contensis.Client.configure({
				fetchFn: global.fetch
			});
		});

		it('With specified root url', async () => {
			let client = Zengenti.Contensis.Client.create(getDefaultConfig());
			let project = await client.projects.get();

			expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

			expect((global.fetch as any).calls.mostRecent().args).toEqual([
				'http://my-website.com/api/management/projects/myProject',
				getDefaultRequest()
			]);

			expect(project).not.toBeNull();
			expect(project.name).toEqual('project1');
		});

		it('Without root url (relative)', async () => {
			const config = getDefaultConfig();
			delete config.rootUrl;

			let client = Zengenti.Contensis.Client.create(config);
			let project = await client.projects.get();

			expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl(true));

			expect((global.fetch as any).calls.mostRecent().args).toEqual([
				'/api/management/projects/myProject',
				getDefaultRequest(null, true)
			]);

			expect(project).not.toBeNull();
			expect(project.name).toEqual('project1');
		});
	});

	describe('List projects', () => {
		beforeEach(() => {
			setDefaultSpy(global, [{
				name: 'project1'
			}, {
				name: 'project2'
			}] as Partial<Project>[]);

			Zengenti.Contensis.Client.defaultClientConfig = null;
			Zengenti.Contensis.Client.configure({
				fetchFn: global.fetch
			});
		});

		it('With specified root url', async () => {
			let client = Zengenti.Contensis.Client.create(getDefaultConfig());
			let projects = await client.projects.list();

			expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

			expect((global.fetch as any).calls.mostRecent().args).toEqual([
				'http://my-website.com/api/management/projects',
				getDefaultRequest()
			]);

			expect(projects).not.toBeNull();
			expect(projects.length).toEqual(2);
			expect(projects[1].name).toEqual('project2');
		});
	});
});
