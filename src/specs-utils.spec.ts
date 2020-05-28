import { Config, User, Group } from './models';

const defaultRootUrl = 'http://my-website.com/';

export const defaultUsers = [{
    id: 'IIIIII1',
    username: 'UUUUUU1',
    email: 'EEEEEE1@test.com'
},
{
    id: 'IIIIII2',
    username: 'UUUUUU2',
    email: 'EEEEEE2@test.com'
}] as Partial<User>[];

export const defaultGroups = [{
    id: 'IIIIII1',
    name: 'NNNNNN1'
},
{
    id: 'IIIIII2',
    name: 'NNNNNN2'
}] as Partial<Group>[];

export function getDefaultAuthenticateUrl(isRelative: boolean = false): string {
    let authenticatePath = 'authenticate/connect/token';
    if (isRelative) {
        return '/' + authenticatePath;
    }
    return defaultRootUrl + authenticatePath;
}

export function getDefaultConfig(): Config {
    return {
        projectId: 'myProject',
        rootUrl: defaultRootUrl,
        language: 'en-US',
        versionStatus: 'published',
        clientId: 'XXXXXX',
        clientSecret: 'YYYYYY'
    };
}

export function getDefaultResponse(method: string = 'GET', isRelative: boolean = false): Object {
    let response = Object({
        method: 'GET',
        mode: 'cors',
        headers: {
            Authorization: 'bearer ZZZZZZ',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            clientId: 'XXXXXX',
            clientSecret: 'YYYYYY'
        }
    });

    if (isRelative) {
        delete response.mode;
    }

    return response;
}

export function setDefaultSpy(global: any, returnValueForApi: any): void {
    spyOn(global, 'fetch').and.returnValues(
        new Promise((resolve, reject) => {
            const returnValueForAuthenticate = {
                access_token: 'ZZZZZZ'
            };
            resolve({
                ok: true,
                json: () => Promise.resolve(returnValueForAuthenticate),
                text: () => Promise.resolve(JSON.stringify(returnValueForAuthenticate))
            } as any);
        }),
        new Promise((resolve, reject) => {
            resolve({
                ok: true,
                json: () => Promise.resolve(returnValueForApi),
                text: () => Promise.resolve(JSON.stringify(returnValueForApi))
            } as any);
        })
    );
}
