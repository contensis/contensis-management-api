"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultRootUrl = 'http://my-website.com/';
exports.defaultUsers = [{
        id: 'IIIIII1',
        username: 'UUUUUU1',
        email: 'EEEEEE1@test.com'
    },
    {
        id: 'IIIIII2',
        username: 'UUUUUU2',
        email: 'EEEEEE2@test.com'
    }];
exports.defaultGroups = [{
        id: 'IIIIII1',
        name: 'NNNNNN1'
    },
    {
        id: 'IIIIII2',
        name: 'NNNNNN2'
    }];
function getDefaultAuthenticateUrl(isRelative = false) {
    let authenticatePath = 'authenticate/connect/token';
    if (isRelative) {
        return '/' + authenticatePath;
    }
    return defaultRootUrl + authenticatePath;
}
exports.getDefaultAuthenticateUrl = getDefaultAuthenticateUrl;
function getDefaultConfig() {
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
exports.getDefaultConfig = getDefaultConfig;
function getDefaultFetchRequest(method, isRelativeUrl, body) {
    let request = Object({
        method: !method ? 'GET' : method,
        mode: 'cors',
        headers: {
            Authorization: 'Bearer ZZZZZZ',
            Accept: 'application/json',
            'Content-Type': method === 'PATCH' ? 'application/merge-patch+json; charset=utf-8' : 'application/json'
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
exports.getDefaultFetchRequest = getDefaultFetchRequest;
function getDefaultXMLHttpRequest(method, body) {
    let request = Object({
        method: !method ? 'GET' : method,
        requestHeaders: {
            Authorization: 'Bearer ZZZZZZ',
            Accept: 'application/json',
            'Content-Type': method === 'PATCH' ? 'application/merge-patch+json; charset=utf-8' : 'application/json'
        }
    });
    if (!!body) {
        request.params = body;
    }
    return request;
}
exports.getDefaultXMLHttpRequest = getDefaultXMLHttpRequest;
function setDefaultSpy(global, returnValueForApi, rejectRequest) {
    spyOn(global, 'fetch').and.returnValues(new Promise((resolve, reject) => {
        const returnValueForAuthenticate = {
            access_token: 'ZZZZZZ'
        };
        resolve({
            ok: true,
            json: () => Promise.resolve(returnValueForAuthenticate),
            text: () => Promise.resolve(JSON.stringify(returnValueForAuthenticate))
        });
    }), new Promise((resolve, reject) => {
        if (rejectRequest === true) {
            reject();
        }
        else {
            resolve({
                ok: true,
                json: () => Promise.resolve(returnValueForApi),
                text: () => Promise.resolve(JSON.stringify(returnValueForApi))
            });
        }
    }));
}
exports.setDefaultSpy = setDefaultSpy;
