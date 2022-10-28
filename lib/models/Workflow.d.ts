import { WorkflowTransition } from './WorkflowTransition';
export interface Workflow {
    allowedEvents: string[];
    id: string;
    state: string;
    transition: WorkflowTransition;
}
