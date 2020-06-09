export interface UserCredentials {
    password: string;
}
export interface UserStatus {
    active: boolean;
    locked: boolean;
    passwordExpired: boolean;
}
export interface User {
    id: string;
    username: string;
    email: string;
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
    lastLogin: Date;
    passwordChanged: Date;
}
