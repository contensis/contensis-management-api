import { IHttpClient, isBrowser, UrlBuilder } from 'contensis-core-api';
import { ContensisClient, EventSubscription, IEventOperations } from '../models';
import { SSE } from '../vendor/sse';

export class EventOperations implements IEventOperations {
    constructor(private httpClient: IHttpClient, private contensisClient: ContensisClient) {
    }

    connectToEventsStream(
        eventSubscription: EventSubscription,
        eventCallback: (message: any, subscriptionId: string) => void): Promise<EventSource> {

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

            EventSource = SSE as any;
            let eventSource = new SSE(`${params.rootUrl}${url}`,
                {
                    payload: JSON.stringify(eventSubscription),
                    method: 'POST',
                    headers: this.contensisClient.getHeaders()
                });

            eventSource.addEventListener('message', (e) => {
                let subscriptionId: string;
                let data: any;
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
            return eventSource as EventSource;
        });
    }

    private ensureIsBrowser(functionName: string): void {
        if (!isBrowser()) {
            throw new Error(`The function IEventOperations.${functionName} can only be called in a browser context.`);
        }
    }

}
