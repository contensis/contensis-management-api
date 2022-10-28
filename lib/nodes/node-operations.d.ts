import { ContensisClient, INodeOperations, Node, NodeGetChildrenOptions } from '../models';
import { IHttpClient } from 'contensis-core-api';
export declare class NodeOperations implements INodeOperations {
    private httpClient;
    private contensisClient;
    constructor(httpClient: IHttpClient, contensisClient: ContensisClient);
    getRoot(): Promise<Node>;
    get(id: string): Promise<Node>;
    getByEntryId(entryId: string): Promise<Node[]>;
    getChildren(idOrOptions: string | NodeGetChildrenOptions): Promise<Node[]>;
    create(node: Node): Promise<Node>;
    update(node: Node): Promise<Node>;
    delete(id: string): Promise<void>;
    setChildrenOrder(id: string, childrenIds: string[], language?: string): Promise<void>;
    deleteChildrenOrder(id: string, language?: string): Promise<void>;
}
