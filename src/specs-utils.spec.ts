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
        clientType: 'client_credentials',
        clientDetails: {
            clientId: 'XXXXXX',
            clientSecret: 'YYYYYY'
        }
    };
}

export function getDefaultRequest(method?: string, isRelativeUrl?: boolean, body?: string): Object {
    let request = Object({
        method: !method ? 'GET' : method,
        mode: 'cors',
        headers: {
            Authorization: 'bearer ZZZZZZ',
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (!!isRelativeUrl) {
        delete request.mode;
    }

    if (!!body) {
        request.body = body;
    }

    return request;
}

export function setDefaultSpy(global: any, returnValueForApi: any, rejectRequest?: boolean): void {
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
            if (rejectRequest === true) {
                reject();
            } else {

                resolve({
                    ok: true,
                    json: () => Promise.resolve(returnValueForApi),
                    text: () => Promise.resolve(JSON.stringify(returnValueForApi))
                } as any);
            }
        })
    );
}
