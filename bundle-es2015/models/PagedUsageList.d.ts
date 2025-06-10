import { PagedList } from "contensis-core-api";
export interface PagedUsageList<T> extends PagedList<T> {
    totalArchivedCount: number;
    totalRecycleBinCount: number;
}
