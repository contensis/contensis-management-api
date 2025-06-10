import { LocalisedString } from "contensis-core-api";
export interface TagGroupUsageInfo {
    id: string;
    name: LocalisedString;
    description: LocalisedString;
    fieldId: string;
    dataFormat: string;
}
