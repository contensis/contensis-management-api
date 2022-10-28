export declare type GroupType = 'sys' | 'contensis' | 'external';
export interface Group {
    id: string;
    name: string;
    description: string;
    type: GroupType;
    custom: {
        [key: string]: any;
    };
    created: Date;
    modified: Date;
}
export declare type GroupToCreate = Omit<Group, 'id'> & Partial<Pick<Group, 'id'>>;
