interface RedirectMatch {
    type: 'beginsWith' | 'exactMatch' | 'regex';
    value: string;
}

export interface Redirect {
    id: string;
    sourceDomain: string;
    destination: string;
    statusCode: 301 | 302 | 303 | 307;
    appendSourcePathToDestination: boolean;
    match: RedirectMatch;
    version?: {
        created: string;
        createdBy: string;
        modified: string;
        modifiedBy: string;
    };
}

export type RedirectToCreate = Omit<Redirect, 'id'> & Partial<Pick<Redirect, 'id'>>;
