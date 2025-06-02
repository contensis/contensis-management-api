import { VersionInfoBase } from "contensis-core-api";

export interface TagGroup {
    id: string;
    name: string;
    description?: string;
    tagCount: number;
    version: VersionInfoBase;
}
