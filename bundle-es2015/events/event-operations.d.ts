import { IHttpClient } from 'contensis-core-api';
import { ContensisClient, EventsSubscription, IEventOperations } from '../models';
export declare class EventOperations implements IEventOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    connectToEventsStream(eventsSubscription: EventsSubscription, eventsCallback: (eventsJSON: string, subscriptionId: string) => void): Promise<EventSource>;
    private ensureIsBrowser;
}
