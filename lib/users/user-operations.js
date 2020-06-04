"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contensis_core_api_1 = require("contensis-core-api");
let listMappers = {
    pageIndex: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
    pageSize: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
    order: (value) => (value && value.length > 0) ? value : null,
};
class UserOperations {
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
        if (!this.httpClient || !this.contensisClient) {
            throw new Error('The class UserOperations was not initialised correctly.');
        }
    }
    getById(userId) {
        if (!userId) {
            throw new Error('A valid user id needs to be specified.');
        }
        return this.getUser(userId);
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
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/security/users', !options ? {} : { q: null, pageIndex: null, pageSize: null, order: null })
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    getGroups(userIdOrOptions) {
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/security/users/:userId/groups', { includeInherited: null })
            .addOptions(userIdOrOptions, 'userId')
            .setParams(this.contensisClient.getParams())
            .addMappers(listMappers)
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    create(user) {
        if (!user) {
            throw new Error('A valid user needs to be specified.');
        }
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/security/users', {})
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
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
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/security/users/:id', {})
            .addOptions(user.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT',
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
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/security/users/:userId/credentials/password', {})
            .addOptions(options, 'userId')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        let requestObject = { new: options.new };
        if (!!options.existing) {
            requestObject['existing'] = options.existing;
        }
        return this.contensisClient.ensureAuthenticationToken().then(() => {
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
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/security/users/:id', {})
            .addOptions(id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'DELETE'
            });
        });
    }
    isInGroup(userId, groupId) {
        if (!userId) {
            throw new Error('A valid users id needs to be specified.');
        }
        if (!groupId) {
            throw new Error('A valid group id needs to be specified.');
        }
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/security/users/:userId/groups/:groupId', {})
            .addOptions(userId, 'userId')
            .addOptions(groupId, 'groupId')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'HEAD'
            }).then(() => true, () => false);
        });
    }
    isInGroups(userId, groupIds) {
        if (!userId) {
            throw new Error('A valid users id needs to be specified.');
        }
        if (!groupIds || groupIds.length === 0) {
            throw new Error('At least a valid group id needs to be specified.');
        }
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/security/users/:userId/groups/:groupIdCsv', {})
            .addOptions(userId, 'userId')
            .addOptions(groupIds.join(','), 'groupIdCsv')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'HEAD'
            }).then(() => true, () => false);
        });
    }
    getUser(idOrNameOrEmail) {
        let url = contensis_core_api_1.UrlBuilder.create('/api/management/security/users/:idOrNameOrEmail', {})
            .addOptions(idOrNameOrEmail, 'idOrNameOrEmail')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureAuthenticationToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
}
exports.UserOperations = UserOperations;
