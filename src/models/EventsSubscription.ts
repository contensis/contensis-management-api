import { EventsSubscriptionTopic } from './EventsSubscriptionTopic';

export interface EventsSubscription {
    topics: EventsSubscriptionTopic[];
    templates?: { [key: string]: string };
}
