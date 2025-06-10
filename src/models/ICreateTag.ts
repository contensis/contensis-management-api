import { Optional } from '../utils';
import { Tag } from './Tag';

/**
 * A Tag-like interface containing required properties to create a new Tag
 * and all other properties are optional or omitted entirely
 */
export interface ICreateTag
    extends Optional<
        Omit<Tag, 'usageCount' | 'version'>,
        | 'id' | 'value'
    > { }
