import { IHttpClient } from 'contensis-core-api';
import { ContensisClient, IEventOperations } from '../models';
export declare class EventOperations implements IEventOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    connectToEventsStream(eventsSubscription: {
        topicsJSON: string;
        templatesJSON?: string;
    }, eventsCallback: (eventsJSON: string, subscriptionId: string) => void): Promise<EventSource>;
    private ensureIsBrowser;
}
