import { EventSubscriptionTopic } from './EventSubscriptionTopic';
export interface EventSubscription {
    topics: EventSubscriptionTopic[];
    templates?: {
        [key: string]: string;
    };
}
