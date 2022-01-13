import {StringOrNumber} from '../types';
import {IHasName} from './has-name.interface';
import {IEntity} from './entity.interface';

/**
 * @since 3.2.5
 */
export interface IEntityWithName<idType extends StringOrNumber> extends IEntity<idType>, IHasName {
}

/**
 * @since 3.2.5
 */
export interface IEntityWithNumberIDAndName extends IEntity<number>, IHasName {
}

/**
 * @since 3.2.5
 */
export interface IEntityWithStringIDAndName extends IEntity<string>, IHasName {
}
