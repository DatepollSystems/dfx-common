import {StringOrNumber} from '../types';
import {IHasID} from './has-id.interface';

export interface IEntity<idType extends StringOrNumber> extends IHasID<idType> {
  originalJsonDto?: any;

  toString(): string;

  hashCode(): idType;

  equals(object: any): boolean;
}

export type IEntityWithNumberID = IEntity<number>;

export type IEntityWithStringID = IEntity<string>;
