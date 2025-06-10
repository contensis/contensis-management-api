import { Optional } from '../utils';
import { TagGroup } from './TagGroup';
/**
 * A TagGroup-like interface containing required properties to update an existing TagGroup
 * and all other properties are optional
 */
export interface IUpdateTagGroup extends Optional<TagGroup, 'tagCount' | 'version'> {
}
