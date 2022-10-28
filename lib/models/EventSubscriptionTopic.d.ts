export interface EventSubscriptionTopic {
    id?: string;
    resourceType?: string;
    event?: string[];
    contentTypeId?: string[];
    language?: string[];
    owner?: string;
    workflowState?: string[];
    workflowEvent?: string[];
}
