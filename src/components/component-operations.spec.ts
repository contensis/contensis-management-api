import * as Contensis from '../index';
import { getDefaultAuthenticateUrl, getDefaultConfig, getDefaultFetchRequest, setDefaultSpy } from '../specs-utils.spec';
import fetch from 'cross-fetch';
import { Component } from 'contensis-core-api';

const Zengenti = { Contensis };
const global = window || this;
global.fetch = fetch;

describe('Component Operations', () => {

	describe('Get component', () => {

		beforeEach(() => {
			setDefaultSpy(global, {
				name: { 'en-GB': 'component1' }
			} as Partial<Component>);

			Zengenti.Contensis.Client.defaultClientConfig = null;
			Zengenti.Contensis.Client.configure({
				fetchFn: global.fetch
			});
		});

		it('by id', async () => {
			let client = Zengenti.Contensis.Client.create(getDefaultConfig());

			let component = await client.components.get('movie');

			expect(global.fetch).toHaveBeenCalledTimes(2);

			expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

			expect((global.fetch as any).calls.mostRecent().args).toEqual([
				'http://my-website.com/api/management/projects/myProject/components/movie?versionStatus=published',
				getDefaultFetchRequest()
			]);

			expect(component).not.toBeNull();
			expect(component.name['en-GB']).toEqual('component1');
		});

		it('with specific options', async () => {
			let client = Zengenti.Contensis.Client.create(getDefaultConfig());

			let component = await client.components.get({
				id: 'movie',
				versionStatus: 'latest',
				version: '0.1'
			});

			expect(global.fetch).toHaveBeenCalledTimes(2);

			expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

			expect((global.fetch as any).calls.mostRecent().args).toEqual([
				'http://my-website.com/api/management/projects/myProject/components/movie?version=0.1',
				getDefaultFetchRequest()
			]);

			expect(component).not.toBeNull();
			expect(component.name['en-GB']).toEqual('component1');
		});
	});

	describe('List components', () => {
		beforeEach(() => {
			setDefaultSpy(global, [{
				name: { 'en-GB': 'component1' }
			}, {
				name: { 'en-GB': 'component2' }
			}] as Partial<Component>[]);

			Zengenti.Contensis.Client.defaultClientConfig = null;
			Zengenti.Contensis.Client.configure({
				fetchFn: global.fetch
			});
		});

		it('With default options', async () => {
			let client = Zengenti.Contensis.Client.create(getDefaultConfig());
			let components = await client.components.list();

			expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

			expect((global.fetch as any).calls.mostRecent().args).toEqual([
				'http://my-website.com/api/management/projects/myProject/components?versionStatus=published',
				getDefaultFetchRequest()
			]);

			expect(components).not.toBeNull();
			expect(components.length).toEqual(2);
			expect(components[1].name['en-GB']).toEqual('component2');
		});

		it('With specific options', async () => {
			let client = Zengenti.Contensis.Client.create(getDefaultConfig());
			let components = await client.components.list('latest');

			expect((global.fetch as any).calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());

			expect((global.fetch as any).calls.mostRecent().args).toEqual([
				'http://my-website.com/api/management/projects/myProject/components',
				getDefaultFetchRequest()
			]);

			expect(components).not.toBeNull();
			expect(components.length).toEqual(2);
			expect(components[1].name['en-GB']).toEqual('component2');
		});
	});
});
