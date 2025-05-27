import { ContensisClient, ContentTypeGetOptions, IContentTypeOperations, ContentTypeListOptions } from '../models';
import { ContentType, IHttpClient } from 'contensis-core-api';
export declare class ContentTypeOperations implements IContentTypeOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    get(idOrOptions: string | ContentTypeGetOptions): Promise<ContentType>;
    list(options?: ContentTypeListOptions): Promise<ContentType[]>;
    create(contentType: ContentType): Promise<ContentType>;
    update(contentType: ContentType): Promise<ContentType>;
    delete(id: string): Promise<void>;
    invokeWorkflow(contentType: ContentType, event: string, data?: any): Promise<ContentType>;
}
