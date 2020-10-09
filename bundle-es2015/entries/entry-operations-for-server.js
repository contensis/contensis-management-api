import { EntryOperations } from './entry-operations';
import { isNodejs, UrlBuilder } from 'contensis-core-api';
import * as FormData from 'form-data';
import * as fs from 'graceful-fs';
export class EntryOperationsForServer extends EntryOperations {
    constructor(httpClient, contensisClient) {
        super(httpClient, contensisClient);
        this.httpClient = httpClient;
        this.contensisClient = contensisClient;
    }
    createAsset(asset, assetFilePath, parentNodePath) {
        this.ensureIsNode('createAsset');
        if (!asset) {
            throw new Error('A valid asset needs to be specified.');
        }
        if (!assetFilePath) {
            throw new Error('A valid asset file path needs to be specified.');
        }
        if (!parentNodePath) {
            throw new Error('A valid parent node path needs to be specified.');
        }
        if (!asset.sys || !asset.sys.dataFormat) {
            asset.sys = asset.sys || {};
            asset.sys.dataFormat = 'asset';
        }
        let form = new FormData();
        form.append('file', fs.createReadStream(assetFilePath));
        let url = UrlBuilder.create('/api/management/projects/:projectId/assets', {})
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: form.getHeaders(this.contensisClient.getHeaders(null)),
                method: 'POST',
                body: form
            })
                .then((assetUploads) => {
                if (!assetUploads || assetUploads.length === 0) {
                    throw new Error('The asset file could not be uploaded.');
                }
                let sysAssetFile = {
                    fileId: assetUploads[0].fileId,
                    parentNodePath: parentNodePath
                };
                asset.sysAssetFile = sysAssetFile;
                return this.create(asset);
            });
        });
    }
    updateAsset(asset, assetFilePath) {
        this.ensureIsNode('updateAsset');
        if (!asset) {
            throw new Error('A valid asset needs to be specified.');
        }
        if (!assetFilePath) {
            return this.update(asset);
        }
        let form = new FormData();
        form.append('file', fs.createReadStream(assetFilePath));
        let url = UrlBuilder.create('/api/management/projects/:projectId/assets', {})
            .setParams(this.contensisClient.getParams())
            .toUrl();
        return this.contensisClient.ensureBearerToken().then(() => {
            return this.httpClient.request(url, {
                headers: form.getHeaders(this.contensisClient.getHeaders(null)),
                method: 'POST',
                body: form
            })
                .then((assetUploads) => {
                if (!assetUploads || assetUploads.length === 0) {
                    throw new Error('The asset file could not be uploaded.');
                }
                let sysAssetFile = {
                    fileId: assetUploads[0].fileId
                };
                asset.sysAssetFile = sysAssetFile;
                return this.update(asset);
            });
        });
    }
    ensureIsNode(functionName) {
        if (!isNodejs()) {
            throw new Error(`The function IEntryOperations.${functionName} can only be called in a Node.js process.`);
        }
    }
}
