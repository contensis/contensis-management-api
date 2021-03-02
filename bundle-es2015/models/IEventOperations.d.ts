import { EventsSubscription } from './EventsSubscription';
export interface IEventOperations {
    connectToEventsStream(eventsSubscription: EventsSubscription, eventsFn: (eventsJSON: string, subscriptionId: string) => void): Promise<EventSource>;
}
