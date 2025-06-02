import { Optional } from '../utils';
import { TagGroup } from './TagGroup';

/**
 * A TagGroup-like interface containing required properties to create a new TagGroup
 * and all other properties are optional or omitted entirely
 */
export interface ICreateTagGroup
    extends Optional<
        Omit<TagGroup, 'tagCount' | 'version'>,
        | 'id'
    > { }
