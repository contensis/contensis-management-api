import { EntryUsageOptions } from "./EntryUsageOptions";
export interface TagUsageOptions extends Omit<EntryUsageOptions, 'contentTypeId' | 'query'> {
    q?: string;
}
