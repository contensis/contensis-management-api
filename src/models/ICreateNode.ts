import { Optional } from '../utils';
import { Node } from './Node';

/**
 * A Node-like interface containing required properties to create a new Node
 * and all other properties are optional
 */
export interface ICreateNode
  extends Optional<
    Node,
    | 'childCount'
    | 'id'
    | 'includeInMenu'
    | 'isCanonical'
    | 'path'
    | 'proxy'
    | 'renderer'
    | 'restrictedToLanguages'
    | 'version'
  > {}
