export interface Node {
    id: string;
    parentId?: string;
    projectId: string;
    displayName: { [key: string]: string };
    slug: { [key: string]: string };
    entryId?: string;
    restrictedToLanguages: string[];
    childCount: number;
    isCanonical: boolean;
}
