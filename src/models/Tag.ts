import { LocalisedString, VersionInfoBase } from "contensis-core-api";

export interface Tag {
    id: string;
    value: string;
    groupId: string;
    label: LocalisedString;
    usageCount: number;
    version: VersionInfoBase
}
