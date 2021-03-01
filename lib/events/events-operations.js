"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contensis_core_api_1 = require("contensis-core-api");
const sse_1 = require("../vendor/sse");
class EventOperations {
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
    }
    connectToEventsStream(eventsSubscription, eventsCallback) {
        this.ensureIsBrowser('connectToEventsStream');
        if (!eventsSubscription) {
            throw new Error('A valid subscription needs to be specified specified.');
        }
        if (!eventsSubscription.topicsJSON) {
            throw new Error('Valid subscription topics need to be specified.');
        }
        if (!eventsCallback) {
            throw new Error('A valid events callback needs to be specified.');
        }
        let subscription = new Object();
        try {
            subscription.topics = JSON.parse(eventsSubscription.topicsJSON);
        }
        catch (error) {
            throw new Error('Invalid topics JSON !');
        }
        if (!!eventsSubscription.templatesJSON) {
            try {
                subscription.templates = JSON.parse(eventsSubscription.templatesJSON);
            }
            catch (error) {
                throw new Error('Invalid templates JSON !');
            }
        }
        let params = this.contensisClient.getParams();
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/projects/:projectId/events/sse/stream')
            .setParams(params)
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            EventSource = sse_1.SSE;
            let eventSource = new sse_1.SSE(`${params.rootUrl}${url}`, {
                payload: JSON.stringify(subscription),
                method: 'POST',
                headers: this.contensisClient.getHeaders()
            });
            eventSource.addEventListener('message', (e) => {
                let subscriptionId;
                let data;
                let doCallback = false;
                if (e.id) {
                    subscriptionId = e.id;
                    doCallback = true;
                }
                if (e.data) {
                    data = e.data;
                    doCallback = true;
                }
                if (doCallback) {
                    eventsCallback(data, subscriptionId);
                }
            });
            eventSource.stream();
            return eventSource;
        });
    }
    ensureIsBrowser(functionName) {
        if (!contensis_core_api_1.isBrowser()) {
            throw new Error(`The function IEventOperations.${functionName} can only be called in a browser context.`);
        }
    }
}
exports.EventOperations = EventOperations;
