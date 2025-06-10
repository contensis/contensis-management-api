import { TagGroup } from './TagGroup';

/**
 * A TagGroup-like interface containing required properties to create a new TagGroup
 * and all other properties are omitted entirely
 */
export interface ICreateTagGroup
    extends Omit<TagGroup, 'tagCount' | 'version'> { }
