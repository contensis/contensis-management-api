"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contensis = require("../index");
const specs_utils_spec_1 = require("../specs-utils.spec");
const contensis_core_api_1 = require("contensis-core-api");
const Zengenti = { Contensis };
describe('Url Builder', function () {
    let client = null;
    beforeEach(() => {
        client = Zengenti.Contensis.Client.create((0, specs_utils_spec_1.getDefaultConfig)());
    });
    it('should populate named values', () => {
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/contenttypes/:contentTypeId/entries')
            .addOptions({ contentTypeId: 'movie' })
            .setParams(client.getParams())
            .toUrl();
        expect(url).toEqual('/api/management/projects/myProject/contenttypes/movie/entries');
    });
    it('should populate multiple named values', () => {
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/someresources/:key/:id')
            .addOptions({ key: 0, id: 1 })
            .setParams(client.getParams())
            .toUrl();
        expect(url).toEqual('/api/management/projects/myProject/someresources/0/1');
    });
    it('should populate multiple named values in query string', () => {
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/someresources', { key: null, id: null })
            .addOptions({ key: 0, id: 1 })
            .setParams(client.getParams())
            .toUrl();
        expect(url).toEqual('/api/management/projects/myProject/someresources?id=1&key=0');
    });
});
