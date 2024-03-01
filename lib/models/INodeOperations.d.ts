import { ICreateNode, IUpdateNode, Node } from './Node';
import { NodeGetChildrenOptions } from './NodeGetChildrenOptions';
export interface INodeOperations {
    getRoot(): Promise<Node>;
    get(id: string): Promise<Node>;
    getByEntryId(entryId: string): Promise<Node[]>;
    getChildren(idOrOptions: string | NodeGetChildrenOptions): Promise<Node[]>;
    create(node: ICreateNode): Promise<Node>;
    update(node: IUpdateNode): Promise<Node>;
    delete(id: string): Promise<void>;
    setChildrenOrder(id: string, childrenIds: string[], language?: string): Promise<void>;
    deleteChildrenOrder(id: string, language?: string): Promise<void>;
}
