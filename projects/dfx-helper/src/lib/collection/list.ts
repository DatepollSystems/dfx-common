import {IList} from './list.interface';
import {ACommonList} from './list.abstract';
import {ManyOrUndefinedOrNullOr} from '../types';

export type IArrayList<T> = IList<T>;

export class List<T> extends ACommonList<List<T>, T> implements IArrayList<T> {
  constructor(items?: ManyOrUndefinedOrNullOr<T>) {
    super(items);
  }

  public create(list?: List<T>): List<T> {
    return new List<T>(list);
  }
}

export function listOf<T>(...items: T[]): List<T> {
  return new List<T>(items);
}
