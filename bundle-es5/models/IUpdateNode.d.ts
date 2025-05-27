import { Optional } from '../utils';
import { Node } from './Node';
/**
 * A Node-like interface containing required properties to update an
 * existing Node and all other properties are optional
 */
export interface IUpdateNode extends Optional<Node, 'childCount' | 'path' | 'proxy' | 'renderer'> {
}
