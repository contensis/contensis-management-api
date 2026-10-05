import { IHttpClient } from 'contensis-core-api';
import { ContensisClient, EventSubscription, IEventOperations } from '../models';
export declare class EventOperations implements IEventOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    connectToEventsStream(eventSubscription: EventSubscription, eventCallback: (message: any, subscriptionId: string) => void): Promise<EventSource>;
    private ensureIsBrowser;
}
