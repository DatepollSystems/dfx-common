import {ICommonList} from './list.interface';
import {ACommonList} from './list.abstract';
import {ManyOrUndefinedOrNullOr} from '../types';

export interface IList<T> extends ICommonList<IList<T>, T> {}

export class List<T> extends ACommonList<List<T>, T> implements IList<T> {
  constructor(items?: ManyOrUndefinedOrNullOr<T>) {
    super(items);
  }

  public clone(): List<T> {
    return new List<T>(this);
  }

  public selfAsTypeT(): List<T> {
    return this;
  }
}

export function listOf<T>(...items: T[]): List<T> {
  return new List<T>(items);
}
