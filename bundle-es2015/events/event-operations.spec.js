import * as Contensis from '../index';
import { getDefaultAuthenticateUrl, getDefaultConfig, getDefaultXMLHttpRequest, setDefaultSpy } from '../specs-utils.spec';
import fetch from 'cross-fetch';
import 'jasmine-ajax';
const Zengenti = { Contensis };
const global = window || this;
global.fetch = fetch;
describe('Event Operations', () => {
    beforeEach(() => {
        jasmine.Ajax.install();
    });
    afterEach(function () {
        jasmine.Ajax.uninstall();
    });
    describe('Connect to events stream', () => {
        beforeEach(() => {
            setDefaultSpy(global, {});
            Zengenti.Contensis.Client.defaultClientConfig = null;
            Zengenti.Contensis.Client.configure({
                fetchFn: global.fetch
            });
        });
        it('with topics', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let isCallbackCalled = false;
            let eventsCallback = (eventsJSON, subscriptionId) => { isCallbackCalled = true; };
            const eventsSubscription = { topics: [{ resourceType: 'entry' }] };
            let eventSource = await client.events.connectToEventsStream(eventsSubscription, eventsCallback);
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            const url = 'http://my-website.com/api/management/projects/myProject/events/sse/stream';
            expect(jasmine.Ajax.requests.mostRecent().url).toBe(url);
            expect(jasmine.Ajax.requests.mostRecent())
                .toEqual(jasmine.objectContaining(getDefaultXMLHttpRequest('POST', JSON.stringify(eventsSubscription))));
            expect(eventSource).not.toBeNull();
            expect(isCallbackCalled).toBeFalse();
            expect(eventSource.url).toEqual(url);
            expect(eventSource.close).toBeDefined();
        });
        it('with topics and templates', async () => {
            let client = Zengenti.Contensis.Client.create(getDefaultConfig());
            let isCallbackCalled = false;
            let eventsCallback = (eventsJSON, subscriptionId) => { isCallbackCalled = true; };
            const eventsSubscription = {
                topics: [{ resourceType: 'entry', contentTypeId: ['artist', 'assetTest'] }],
                templates: { 'entry': '{"title": "{{resource.entryTitle}}", "id": "{{resource.sys.id}}", "alias": "{{event.alias}}"}' }
            };
            let eventSource = await client.events.connectToEventsStream(eventsSubscription, eventsCallback);
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch.calls.first().args[0]).toEqual(getDefaultAuthenticateUrl());
            const url = 'http://my-website.com/api/management/projects/myProject/events/sse/stream';
            expect(jasmine.Ajax.requests.mostRecent().url).toBe(url);
            expect(jasmine.Ajax.requests.mostRecent())
                .toEqual(jasmine.objectContaining(getDefaultXMLHttpRequest('POST', JSON.stringify(eventsSubscription))));
            expect(eventSource).not.toBeNull();
            expect(isCallbackCalled).toBeFalse();
            expect(eventSource.url).toEqual(url);
            expect(eventSource.close).toBeDefined();
        });
    });
});
