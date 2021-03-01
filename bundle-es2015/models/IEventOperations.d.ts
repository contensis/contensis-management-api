export interface IEventOperations {
    connectToEventsStream(eventsSubscription: {
        topicsJSON: string;
        templatesJSON?: string;
    }, eventsFn: (eventsJSON: string, subscriptionId: string) => void): Promise<EventSource>;
}
