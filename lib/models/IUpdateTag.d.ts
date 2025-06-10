import { Optional } from '../utils';
import { Tag } from './Tag';
/**
 * A Tag-like interface containing required properties to update an existing Tag
 * and all other properties are optional
 */
export interface IUpdateTag extends Optional<Tag, 'usageCount' | 'version'> {
}
