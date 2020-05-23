import * as Contensis from '../index';
import { getDefaultConfig } from '../specs-utils.spec';
import { UrlBuilder } from 'contensis-core-api';

const Zengenti = { Contensis };

describe('Url Builder', function () {
	let client = null;

	beforeEach(() => {
		client = Zengenti.Contensis.Client.create(getDefaultConfig());
	});

	it('should populate named values', () => {
		let url = UrlBuilder.create('/api/management/projects/:projectId/contenttypes/:contentTypeId/entries')
			.addOptions({ contentTypeId: 'movie' })
			.setParams(client.getParams())
			.toUrl();

		expect(url).toEqual('/api/management/projects/myProject/contenttypes/movie/entries');
	});

	it('should populate multiple named values', () => {
		let url = UrlBuilder.create('/api/management/projects/:projectId/someresources/:key/:id')
			.addOptions({ key: 0, id: 1 })
			.setParams(client.getParams())
			.toUrl();

		expect(url).toEqual('/api/management/projects/myProject/someresources/0/1');
	});

	it('should populate multiple named values in query string', () => {
		let url = UrlBuilder.create('/api/management/projects/:projectId/someresources', { key: null, id: null })
			.addOptions({ key: 0, id: 1 })
			.setParams(client.getParams())
			.toUrl();

		expect(url).toEqual('/api/management/projects/myProject/someresources?id=1&key=0');
	});
});
