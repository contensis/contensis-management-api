export class ClientConfig {
    currentConfig;
    previousConfig;
    rootUrl = null;
    clientType = null;
    clientDetails = null;
    defaultHeaders = null;
    projectId = null;
    language = null;
    versionStatus = 'latest';
    pageIndex = 0;
    pageSize = 25;
    responseHandler = null;
    fetchFn = null;
    constructor(currentConfig, previousConfig) {
        this.currentConfig = currentConfig;
        this.previousConfig = previousConfig;
        this.rootUrl = this.getValue((c) => c.rootUrl);
        this.clientType = this.getValue((c) => c.clientType);
        this.clientDetails = this.getValue((c) => c.clientDetails);
        this.defaultHeaders = this.getValue((c) => c.defaultHeaders);
        this.projectId = this.getValue((c) => c.projectId);
        this.language = this.getValue((c) => c.language);
        this.versionStatus = this.getValue((c) => c.versionStatus);
        this.pageIndex = this.getValue((c) => c.pageIndex);
        this.pageSize = this.getValue((c) => c.pageSize);
        this.responseHandler = this.getValue((c) => c.responseHandler);
        this.fetchFn = this.getValue((c) => c.fetchFn);
        while (this.rootUrl && this.rootUrl.substr(this.rootUrl.length - 1, 1) === '/') {
            this.rootUrl = this.rootUrl.substr(0, this.rootUrl.length - 1);
        }
    }
    toParams() {
        return {
            rootUrl: this.rootUrl,
            clientType: this.clientType,
            clientDetails: this.clientDetails,
            defaultHeaders: this.defaultHeaders,
            projectId: this.projectId,
            language: this.language,
            versionStatus: this.versionStatus,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            responseHandler: this.responseHandler
        };
    }
    getValue(getter) {
        let result = null;
        if (this.currentConfig) {
            result = getter(this.currentConfig);
        }
        if (this.previousConfig && !result) {
            result = getter(this.previousConfig);
        }
        return result || getter(this);
    }
}
