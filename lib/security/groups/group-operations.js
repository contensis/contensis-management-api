"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupOperations = void 0;
const contensis_core_api_1 = require("contensis-core-api");
let listMappers = {
    pageIndex: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
    pageSize: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
    order: (value) => (value && value.length > 0) ? value : null,
};
let userListMappers = {
    pageIndex: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageIndex) || (params.pageIndex),
    pageSize: (value, options, params) => (options && options.pageOptions && options.pageOptions.pageSize) || (params.pageSize),
    order: (value) => (value && value.length > 0) ? value : null,
};
class GroupOperations {
    constructor(httpClient, contensisClient) {
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
        if (!this.httpClient || !this.contensisClient) {
            throw new Error('The class GroupOperations was not initialised correctly.');
        }
    }
    getById(groupId) {
        if (!groupId) {
            throw new Error('A valid group id value needs to be specified.');
        }
        return this.getGroup(groupId);
    }
    getByName(groupName) {
        if (!groupName) {
            throw new Error('A valid group name value needs to be specified.');
        }
        return this.getGroup(groupName);
    }
    list(options) {
        let url = contensis_core_api_1.UrlBuilder.create('/api/security/groups', !options ? {} : { q: null, pageIndex: null, pageSize: null, order: null, zenQL: null })
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
    create(group) {
        if (!group) {
            throw new Error('A valid group needs to be specified.');
        }
        let url = contensis_core_api_1.UrlBuilder.create('/api/security/groups', {})
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(group)
            });
        });
    }
    update(group) {
        if (!group) {
            throw new Error('A valid group needs to be specified.');
        }
        if (!group.id) {
            throw new Error('A valid group id value needs to be specified.');
        }
        let url = contensis_core_api_1.UrlBuilder.create('/api/security/groups/:id', {})
            .addOptions(group.id, 'id')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT',
                body: JSON.stringify(group)
            });
        });
    }
    delete(id) {
        if (!id) {
            throw new Error('A valid id needs to be specified.');
        }
        let url = contensis_core_api_1.UrlBuilder.create('/api/security/groups/:id', {})
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
    addUser(groupId, userId) {
        if (!groupId) {
            throw new Error('A valid group id needs to be specified.');
        }
        if (!userId) {
            throw new Error('A valid user id needs to be specified.');
        }
        let url = contensis_core_api_1.UrlBuilder.create('/api/security/groups/:groupId/users/:userId', {})
            .addOptions(groupId, 'groupId')
            .addOptions(userId, 'userId')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT'
            });
        });
    }
    addUsers(groupId, userIds) {
        if (!groupId) {
            throw new Error('A valid group id needs to be specified.');
        }
        if (!userIds || userIds.length === 0) {
            throw new Error('At least one valid user id needs to be specified.');
        }
        let url = contensis_core_api_1.UrlBuilder.create('/api/security/groups/:groupId/users', {})
            .addOptions(groupId, 'groupId')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'POST',
                body: JSON.stringify(userIds)
            });
        });
    }
    removeUser(groupId, userId) {
        if (!groupId) {
            throw new Error('A valid group id needs to be specified.');
        }
        if (!userId) {
            throw new Error('A valid user id needs to be specified.');
        }
        let url = contensis_core_api_1.UrlBuilder.create('/api/security/groups/:groupId/users/:userId', {})
            .addOptions(groupId, 'groupId')
            .addOptions(userId, 'userId')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'DELETE'
            });
        });
    }
    hasUser(groupId, userId) {
        if (!groupId) {
            throw new Error('A valid group id needs to be specified.');
        }
        if (!userId) {
            throw new Error('A valid users id needs to be specified.');
        }
        let url = contensis_core_api_1.UrlBuilder.create('/api/security/groups/:groupId/users/:userId', {})
            .addOptions(groupId, 'groupId')
            .addOptions(userId, 'userId')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'HEAD'
            }).then(() => true, () => false);
        });
    }
    addChildGroup(groupId, childGroupId) {
        if (!groupId) {
            throw new Error('A valid group id needs to be specified.');
        }
        if (!childGroupId) {
            throw new Error('A valid child group id needs to be specified.');
        }
        let url = contensis_core_api_1.UrlBuilder.create('/api/security/groups/:groupId/groups/:childGroupId', {})
            .addOptions(groupId, 'groupId')
            .addOptions(childGroupId, 'childGroupId')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'PUT'
            });
        });
    }
    removeChildGroup(groupId, childGroupId) {
        if (!groupId) {
            throw new Error('A valid group id needs to be specified.');
        }
        if (!childGroupId) {
            throw new Error('A valid child group id needs to be specified.');
        }
        let url = contensis_core_api_1.UrlBuilder.create('/api/security/groups/:groupId/groups/:childGroupId', {})
            .addOptions(groupId, 'groupId')
            .addOptions(childGroupId, 'childGroupId')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders(),
                method: 'DELETE'
            });
        });
    }
    getUsersByGroupId(groupId, options) {
        if (!groupId) {
            throw new Error('A valid group id value needs to be specified.');
        }
        return this.getUsersInGroup(groupId, options);
    }
    getUsersByGroupName(groupName, options) {
        if (!groupName) {
            throw new Error('A valid group name value needs to be specified.');
        }
        return this.getUsersInGroup(groupName, options);
    }
    getChildGroupsByGroupId(groupId, options) {
        if (!groupId) {
            throw new Error('A valid group id value needs to be specified.');
        }
        return this.getChildGroups(groupId, options);
    }
    getChildGroupsByGroupName(groupName, options) {
        if (!groupName) {
            throw new Error('A valid group name value needs to be specified.');
        }
        return this.getChildGroups(groupName, options);
    }
    getGroup(idOrName) {
        let url = contensis_core_api_1.UrlBuilder.create('/api/security/groups/:idOrName', {})
            .addOptions(idOrName, 'idOrName')
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    getUsersInGroup(idOrName, options) {
        let url = contensis_core_api_1.UrlBuilder.create('/api/security/groups/:idOrName/users', !options ? {} : { includeInherited: null, q: null, pageIndex: null, pageSize: null, order: null })
            .addOptions(idOrName, 'idOrName')
            .addOptions(options)
            .setParams(this.contensisClient.getParams())
            .addMappers(userListMappers)
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: this.contensisClient.getHeaders()
            });
        });
    }
    getChildGroups(idOrName, options) {
        let url = contensis_core_api_1.UrlBuilder.create('/api/security/groups/:idOrName/groups', !options ? {} : { includeInherited: null, q: null, pageIndex: null, pageSize: null, order: null })
            .addOptions(idOrName, 'idOrName')
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
}
exports.GroupOperations = GroupOperations;
