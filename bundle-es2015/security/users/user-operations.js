import { isBrowser, isIE, UrlBuilder } from 'contensis-core-api';
let listMappers = {
    pageIndex: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
    pageSize: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
    order: (value) => (value && value.length > 0) ? value : null,
    excludedGroups: (value) => (value && value.length > 0) ? value.join(',') : null,
};
export class UserOperations {
    httpClient;
    contensisClient;
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
        if (!this.httpClient || !this.contensisClient) {
            throw new Error('The class UserOperations was not initialised correctly.');
        }
    }
    getCurrent() {
        return this.getUser('@current');
    }
    getById(userId, isClassic = false) {
        if (!userId) {
            throw new Error('A valid user id needs to be specified.');
        }
        return this.getUser(userId, isClassic);
    }
    getByUsername(username) {
        if (!username) {
            throw new Error('A valid user name needs to be specified.');
        }
        return this.getUser(username);
    }
    getByEmail(email) {
        if (!email) {
            throw new Error('A valid user email needs to be specified.');
        }
        return this.getUser(email);
    }
    list(options) {
        let url = UrlBuilder.create('/api/security/users', !options ? {} : { q: null, pageIndex: null, pageSize: null, order: null, zenQL: null })
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    search(query) {
        if (!query) {
            return new Promise((resolve) => { resolve(null); });
        }
        return this.searchUsingManagementQuery(query);
    }
    getUserGroups(userIdOrOptions) {
        let url = UrlBuilder.create('/api/security/users/:userId/groups', { order: null, pageIndex: null, pageSize: null, includeInherited: null, excludedGroups: null })
            .addOptions(userIdOrOptions, 'userId')
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    create(user, suspended) {
        if (!user) {
            throw new Error('A valid user needs to be specified.');
        }
        let url = UrlBuilder.create('/api/security/users', { suspended: null })
            .addOptions({ suspended: suspended === true ? true : null })
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(user)
            });
        });
    }
    update(user) {
        if (!user) {
            throw new Error('A valid user needs to be specified.');
        }
        if (!user.id) {
            throw new Error('A valid user id value needs to be specified.');
        }
        let url = UrlBuilder.create('/api/security/users/:id', {})
            .addOptions(user.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders('application/merge-patch+json; charset=utf-8'),
                method: 'PATCH',
                body: JSON.stringify(user)
            });
        });
    }
    updatePassword(options) {
        if (!options || !options.userId) {
            throw new Error('A valid user id needs to be specified.');
        }
        if (!options.new) {
            throw new Error('A valid new password value needs to be specified.');
        }
        let url = UrlBuilder.create('/api/security/users/:userId/credentials/password', {})
            .addOptions(options, 'userId')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        let requestObject = { new: options.new };
        if (!!options.existing) {
            requestObject['existing'] = options.existing;
        }
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(requestObject)
            });
        });
    }
    delete(id) {
        if (!id) {
            throw new Error('A valid id needs to be specified.');
        }
        let url = UrlBuilder.create('/api/security/users/:id', {})
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'DELETE'
            });
        });
    }
    userIsMemberOf(userId, ...groupIdsOrNames) {
        if (!userId) {
            throw new Error('A valid user id needs to be specified.');
        }
        if (!groupIdsOrNames || groupIdsOrNames.length === 0) {
            throw new Error('At least a valid group id or name needs to be specified.');
        }
        let url = UrlBuilder.create('/api/security/users/:userId/groups/:groupIdsOrNamesCsv', {})
            .addOptions(userId, 'userId')
            .addOptions(groupIdsOrNames.join(','), 'groupIdsOrNamesCsv')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'HEAD'
            }).then(() => true, () => false);
        });
    }
    setPasswordToExpirable(userId) {
        return this.performUserAction(userId, 'setPasswordToExpirable');
    }
    suspendUser(userId) {
        return this.performUserAction(userId, 'suspend');
    }
    unlockUser(userId) {
        return this.performUserAction(userId, 'unlock');
    }
    unsuspendUser(userId) {
        return this.performUserAction(userId, 'unsuspend');
    }
    performUserAction(userId, userActionType) {
        if (!userId) {
            throw new Error('A valid user id needs to be specified.');
        }
        let url = UrlBuilder.create('/api/security/users/:id/actions', {})
            .addOptions(userId, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify({ type: userActionType })
            });
        });
    }
    getUser(idOrNameOrEmail, isClassic = false) {
        let url = UrlBuilder.create('/api/security/users/:idOrNameOrEmail', { classicUserId: null })
            .addOptions(idOrNameOrEmail, 'idOrNameOrEmail')
            .addOptions(isClassic ? 'true' : null, 'classicUserId')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    searchUsingManagementQuery(query) {
        let params = this.contensisClient.getParams();
        let pageSize = query.pageSize || params.pageSize;
        let pageIndex = query.pageIndex || 0;
        let orderBy = (query.orderBy && (query.orderBy._items || query.orderBy));
        let { clientType, clientDetails, projectId, language, responseHandler, rootUrl, versionStatus, ...requestParams } = params;
        let payload = {
            ...requestParams,
            pageSize,
            pageIndex,
            where: JSON.stringify(query.where),
        };
        if (query.orderBy && (!Array.isArray(query.orderBy) || query.orderBy.length > 0)) {
            payload['orderBy'] = JSON.stringify(orderBy);
        }
        let url = UrlBuilder.create('/api/security/users/search', { ...payload })
            .setParams(payload)
            .toUrl();
        let absoluteUrl = (!params.rootUrl || params.rootUrl === '/') ? url : params.rootUrl + url;
        if (isBrowser() && isIE() && absoluteUrl.length > 2083) {
            return this.searchUsingPost(query);
        }
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                method: 'GET',
                headers: this.contensisClient.getHeaders(),
            });
        });
    }
    searchUsingPost(query) {
        let url = UrlBuilder.create('/api/security/users/search')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                method: 'POST',
                headers: this.contensisClient.getHeaders(),
                body: JSON.stringify(query)
            });
        });
    }
}
