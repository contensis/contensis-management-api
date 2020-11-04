
export interface WorkflowTransition {
    data: {
        [key: string]: any;
    };
    event: string;
    from: string;
    invoked: string;
    invokedBy: string;
}
