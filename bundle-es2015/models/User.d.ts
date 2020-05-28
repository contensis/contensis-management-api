export interface UserCredentials {
    password: string;
}
export interface UserStatus {
    active: boolean;
    deactivationReason: string;
    locked: boolean;
    passwordExpired: boolean;
    passwordExpiry: Date;
}
export interface User {
    id: string;
    username: string;
    email: string;
    title: string;
    firstname: string;
    lastname: string;
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
    activated: Date;
    lastLogin: Date;
    passwordChanged: Date;
}
