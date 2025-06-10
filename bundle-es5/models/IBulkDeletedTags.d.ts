export interface IBulkDeletedTags {
    success: {
        id: string;
    }[];
    failed?: {
        id: string;
        error: {
            type: string;
            message: string;
            data: any;
        };
    }[];
}
