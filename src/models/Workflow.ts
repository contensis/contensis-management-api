export interface Workflow {
    id: string;
    sttate: string;
    allowedEvents: string[];
    transition: any;
    data: string;
    invoked: string;
    from: string;
    invokedBy: string;
    event: string;
}
