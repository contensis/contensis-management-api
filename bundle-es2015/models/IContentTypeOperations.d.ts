import { ContentType } from 'contensis-core-api';
import { ContentTypeGetOptions } from './ContentTypeGetOptions';
import { ContentTypeListOptions } from './ContentTypeListOptions';
export interface IContentTypeOperations {
    get(idOrOptions: string | ContentTypeGetOptions): Promise<ContentType>;
    list(options?: ContentTypeListOptions): Promise<ContentType[]>;
    create(contentType: ContentType): Promise<ContentType>;
    update(contentType: ContentType): Promise<ContentType>;
    delete(id: string): Promise<void>;
    invokeWorkflow(contentType: ContentType, event: string, data?: any): Promise<ContentType>;
}
