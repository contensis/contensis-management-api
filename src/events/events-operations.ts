import { IHttpClient, isBrowser, UrlBuilder } from 'contensis-core-api';
import { ContensisClient, IEventOperations } from '../models';
import { SSE } from '../vendor/sse';

export class EventOperations implements IEventOperations {
    constructor(private httpClient: IHttpClient, private contensisClient: ContensisClient) {
    }

    connectToEventsStream(
        eventsSubscription: { topicsJSON: string; templatesJSON?: string; },
        eventsCallback: (eventsJSON: string, subscriptionId: string) => void): Promise<EventSource> {

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

        let subscription: any = new Object();

        try {
            subscription.topics = JSON.parse(eventsSubscription.topicsJSON);
        } catch (error) {
            throw new Error('Invalid topics JSON !');
        }

        if (!!eventsSubscription.templatesJSON) {
            try {
                subscription.templates = JSON.parse(eventsSubscription.templatesJSON);
            } catch (error) {
                throw new Error('Invalid templates JSON !');
            }
        }

        let params = this.contensisClient.getParams();
        let url = UrlBuilder.create('/api/management/projects/:projectId/events/sse/stream')
            .setParams(params)
            .toUrl();

        return this.contensisClient.ensureBearerToken().then(() => {

            EventSource = SSE as any;
            let eventSource = new SSE(`${params.rootUrl}${url}`,
                {
                    payload: JSON.stringify(subscription),
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
                    eventsCallback(data, subscriptionId);
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
