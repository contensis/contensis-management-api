export interface CredentialsProvider {
    type: string;
    name: string;
}

export interface UserCredentials {
    password: string;
    provider: CredentialsProvider;
}

export interface UserStatus {
    suspended: boolean;
    locked: boolean;
    passwordResetRequired: boolean;
    // suspensionReason: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    timezone: string;
    language: string;
    custom: {
        [key: string]: any;
    };
    credentials: UserCredentials;
    status: UserStatus;
    created: Date;
    modified: Date;
    lastLogin: Date;
    passwordChanged: Date;
    optOutOfNotifications: boolean;
}

export type UserToCreate = Omit<User, 'id'> & Partial<Pick<User, 'id'>>;
