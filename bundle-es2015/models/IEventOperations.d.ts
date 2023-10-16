import { EventSubscription } from './EventSubscription';
export interface IEventOperations {
    connectToEventsStream(eventsSubscription: EventSubscription, eventsFn: (message: any, subscriptionId: string) => void): Promise<EventSource>;
}
