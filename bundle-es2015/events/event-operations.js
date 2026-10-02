import { isBrowser, UrlBuilder } from 'contensis-core-api';
import { SSE } from '../vendor/sse';
export class EventOperations {
    httpClient;
    contensisClient;
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
    }
    connectToEventsStream(eventSubscription, eventCallback) {
        this.ensureIsBrowser('connectToEventsStream');
        if (!eventSubscription) {
            throw new Error('A valid event subscription needs to be specified.');
        }
        if (!eventSubscription.topics || eventSubscription.topics.length === 0) {
            throw new Error('Valid event subscription topics need to be specified.');
        }
        if (!eventCallback) {
            throw new Error('A valid event callback needs to be specified.');
        }
        let params = this.contensisClient.getParams();
        let url = UrlBuilder.create('/api/management/projects/:projectId/events/sse/stream')
            .setParams(params)
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            EventSource = SSE;
            let eventSource = new SSE(`${params.rootUrl}${url}`, {
                payload: JSON.stringify(eventSubscription),
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
                    eventCallback(data, subscriptionId);
                }
            });
            eventSource.stream();
            return eventSource;
        });
    }
    ensureIsBrowser(functionName) {
        if (!isBrowser()) {
            throw new Error(`The function IEventOperations.${functionName} can only be called in a browser context.`);
        }
    }
}
